const express = require('express');
const passport = require('passport');
const checkIfAuthenticated = require('../middleware/checkAuthenticated');
const router = express.Router();

/* GET home page. */
router.get('/', checkIfAuthenticated, function(req, res) {
  res.render('index', {
    title: 'express',
    user: req.user
  })
})

// Login POST requests
router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
)


module.exports = router
