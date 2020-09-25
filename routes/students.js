const express = require('express')
const router = express.Router()
const Student = require('../models/student')
const Company = require('../models/Company')
const { check, body, validationResult } = require('express-validator');

const checkIfAuthenticated = require('../middleware/checkAuthenticated')
const { createStudentFromApi, findOrCreateStudent, updateStudent } = require('../controllers/studentcontrollers')
const { createCompanyFromApi, findOrCreateCompany, updateCompany } = require("../controllers/companycontrollers");
const { validateAndRedirect } = require('../controllers/validateAndRedirect')
const { validateStudent } = require('../middleware/student')

const woo = require('../config/woocommerceapi')
const flash = require('express-flash')

// GET request to /students
// Renders the view
router.get('/', checkIfAuthenticated, function(req, res) {
  const boolean = req.session.wascreated
	req.session.wascreated = null
  const students = Student.findAll({ order: [['updated_at', 'DESC']]})
  students.then((students) => {
    res.render('students', {
      title: 'Kursister',
      user: req.user,
      students: students,
    })
  })
})

// Get request to /students/add
// Renders the view
router.get('/add', checkIfAuthenticated, (req, res) => {
  res.render('addstudent', {
    title: 'Tilføj kursist',
    user: req.user,
  })
})
  
router.get('/add/approve', checkIfAuthenticated, (req, res) => {
  woo.get('orders/'+req.query.order)
  .then((result) => {
      const student = createStudentModelFromApi(result)
      res.render('approvestudent', {
        user: req.user,
        student: student
      })
  })
  .catch((err) => {
    res.send(`Der findes ingen kursist med ordrenummer: ${req.query.order}`)
    err.res
  })
})

// POST request to /add/approve
router.post('/add/approve', checkIfAuthenticated, (req, res) => {
  const redirectPath = '/students'
  let instance = findOrCreateStudent(req)
	instance.then(([instance, wasCreated]) => {
    if (wasCreated === true) {
      validateAndRedirect(wasCreated, req, res, redirectPath)
    } else {
      req.session.oldStudent = instance
      req.session.newStudent = req.body
      req.flash('error', 'Kursisten eksisterer allerede i databasen')
      res.redirect('/students/compare') 
    }
    
	}).catch(err => console.error(err))
})

router.get('/id/:id', checkIfAuthenticated, (req, res) => {
	const student = Student.findByPk(req.params.id)
	student.then((result) => {
		res.render('studentpage', {
			user: req.user,
			student: result
		})
	}).catch((err) => console.error(err))
})

// students/compare GET request
router.get('/comparestudent', checkIfAuthenticated, (req, res) => {
  // session vars
  const oldStudent = req.session.oldStudent
  const newStudent = req.session.newStudent

  res.render('comparestudent', {
    user: req.user,
    oldStudent: oldStudent,
    newStudent: newStudent
  })
})

// Import order from webshop flow: 
// [Find order] @ students/add => GET import/1, if ALREADY EXISTS in DB => GET /comparecompany => POST /comparecompany 
// => GET /import/2, if ALREADY EXISTS in DB => GET /comparestudents => POST comparestudents => redirect /students

// students/compare POST request
// Update student fields
router.post('/comparestudent', checkIfAuthenticated, (req, res) => {
  /*if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }*/
  body('post_code').exists().isPostalCode()
  console.log(" hej " + req.body.post_code)
  const errors = validationResult(req).throw()
  console.log(errors)

  const student = Student.findOne({
    where: {
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }
  })
  .then((result) => {
    updateStudent(result, req.body)
    req.flash('success', 'Kursisten blev opdateret!')
    res.redirect('/students')
  })
  .catch((err) => {
    console.error(err)
    if(err.message == 'Query was empty'){
      console.log('There is no changes in the update, lets continue the progress...');
      res.redirect('/students')
    }
  })
})

// Compare Companies routes
router.get('/comparecompany', checkIfAuthenticated, (req, res) => {
  // session vars
  const oldCompany = req.session.oldCompany
  const newCompany = req.session.newCompany

  res.render('comparecompany', {
    user: req.user,
    oldCompany: oldCompany,
    newCompany: newCompany
  })
})

router.post('/comparecompany', checkIfAuthenticated,  (req, res) => {
  const company = Company.findOne({
    where: {
      name: req.body.name,
    }
  })
  .then((result) => {
    updateCompany(result, req.body)
    req.flash('success', 'Firmaet blev opdateret!')
    res.redirect('import/2')
  })
  .catch((err) => console.error(err))
})

// Import order step 1 - GET request ---- Burde være middleware
router.get('/import/1', (req, res) => { 
  req.session.query = req.query.order
  woo.get('orders/' + req.session.query)
  .then((result) => {
    const successRedirectPath = '/import/2'
    const company = createCompanyFromApi(result)
    const instance = findOrCreateCompany(company)
    instance.then(([instance, wasCreated]) => {
      if (wasCreated === true) {
        req.flash('success', 'Firmaet blev oprettet!')
        validateAndRedirect(wasCreated, req, res, successRedirectPath)
      } else {
        req.session.oldCompany = instance
        req.session.newCompany = company
        req.flash('error', 'Firmaet eksisterer allerede i databasen')
        res.redirect('/students/comparecompany') 
      }
    }).catch((err) => console.error(err))
  .catch((err) => {
    res.send(`Der findes ingen ordre med ordrenummer: ${req.query.order}`)
    err.res
  })
  })
})

//Import order step 2 - GET request -- Burde være middleware
router.get('/import/2', (req, res) => {
  const orderId = req.session.query
  req.session.query = null
  console.log(orderId)
  woo.get('orders/' + orderId)
  .then((result) => {
    const student = createStudentFromApi(result)
    const instance = findOrCreateStudent(student)
    instance.then(([instance, wasCreated]) => {
      console.log(wasCreated)
      if (wasCreated === true) {
        req.flash('success', 'firmaet blev oprettet!')
        validateAndRedirect(wasCreated, req, res, redirectPath)
      } else {
        req.session.oldStudent = instance
        req.session.newStudent = student
        req.flash('error', 'Kursisten eksisterer allerede i databasen')
        res.redirect('/students/comparestudent') 
      }
    }).catch((err) => console.error(err))
    .catch((err) => {
      console.error(err)
      res.send(`Der findes ingen ordre med ordrenummer: ${req.query.order}`)
    })
  })
})

module.exports = router;