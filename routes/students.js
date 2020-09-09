const express = require('express')
const router = express.Router()
const Student = require('../models/student')
const { Sequelize, DataTypes } = require('sequelize')

const checkIfAuthenticated = require('../middleware/checkAuthenticated')
const { importStudentByOrderId, createStudentModelFromApi } = require('../middleware/Student')
const { findOrCreateStudent } = require('../controllers/findOrCreateStudent')
const { validateAndRedirect } = require('../controllers/validateAndRedirect')
const { updateStudent } = require('../controllers/updateStudent')

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
    console.log(result)
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
router.get('/compare', checkIfAuthenticated, (req, res) => {
  // session vars
  const oldStudent = req.session.oldStudent
  const newStudent = req.session.newStudent

  res.render('comparestudent', {
    user: req.user,
    oldStudent: oldStudent,
    newStudent: newStudent
  })
})

// students/compare POST request
// Update student fields
router.post('/compare', checkIfAuthenticated, (req, res) => {
  const student = Student.findOne({
    where: {
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }
  })
  .then((result) => {
    updateStudent(result, req)
    req.flash('error', 'Kursisten blev opdateret!')
    res.redirect('/students')
  })
})


module.exports = router;