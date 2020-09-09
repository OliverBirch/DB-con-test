const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const flash = require('express-flash')
const bcrypt = require('bcrypt')
const passport = require('passport')
const dotenv = require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const LocalStrategy = require('passport-local').Strategy

// config
const db = require('./config/database')
const woo = require('./config/woocommerceapi')
const getCompanyByCvr = require('./config/cvrapi')

// CVR API!
//getCompanyByCvr(39960052)

//API TEST
function getAllProducts() {
  woo.get("products?per_page=100")
  .then((response) => {
    response.data.forEach(res => {
      console.log(res.name + " " + res.id)
    })
  })
  .catch((error) => {
    console.log(error.response.data);
  })
}

function getProductVariant() {
  woo.get("products/174/variations/1214")
  .then((response) => {
    console.log(response)
  })
  .catch(err => console.error(err))
}
function getOrderTest() {
  woo.get("orders/5451")
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error.response.data);
  })
}
// Kursusnavne: @ orders/{ordrenummer}    response.data.line_items (name, id, product_id)

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(session({ resave: true, secret: process.env.SESSION_SECRET, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const companiesRouter = require('./routes/companies')
const studentsRouter = require('./routes/students')

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/companies', companiesRouter)
app.use('/students', studentsRouter)

require('./config/passport')(passport)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})

//Admin Creation SLET!
const User = require('./models/User');

function createAdmin() {
  SALT_WORK_FACTOR = 12

  const hashedPassword = bcrypt.hash('a', 10)
  hashedPassword.then((res) => {
    return User.findOrCreate({
      where: {
        name: 'a'
      },
      defaults: {
        email: 'test1',
        password: res
      }
    })
  })
  .catch((err) => console.error(err))
}
//createAdmin()

// PORT
const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app