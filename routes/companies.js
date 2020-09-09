const express = require('express');
const router = express.Router()
const session = require('express-session')
const Company = require('../models/Company');
const { Sequelize, DataTypes } = require('sequelize');
const checkIfAuthenticated = require('../middleware/checkAuthenticated')


//Middleware & Controllers
const { getAllCompanies } = require('../middleware/companies');
const { findOrCreateCompany } = require("../controllers/findOrCreateCompany");
const { validateAndRedirect } = require('../controllers/validateAndRedirect')

// GET request to /companies 
router.get('/', getAllCompanies, checkIfAuthenticated, function(req, res) {
	const boolean = req.session.wascreated
	req.session.wascreated = null

	res.render('companies', {
		title: 'Firmaer',
		user: req.user,
		companies: req.data,
		wascreated: boolean
	})
})

// GET request to /companies/add
router.get('/add', checkIfAuthenticated, (req, res) => {
	res.render('addcompany', {
		user: req.user
	})
})

// POST request to /companies/add
router.post('/', checkIfAuthenticated, (req, res) => {
	const redirectPath = 'companies'
	let instance = findOrCreateCompany(req)
	instance.then(([instance, wasCreated]) => {
		validateAndRedirect(wasCreated, req, res, redirectPath)
	}).catch(err => console.error(err))
})

router.get('/id/:id', checkIfAuthenticated, (req, res) => {
	const company = Company.findByPk(req.params.id)
	company.then((result) => {
		console.log(result)
		res.render('companypage', {
			user: req.user,
			company: result
		})
	}).catch((err) => console.error(err))
})

module.exports = router;
