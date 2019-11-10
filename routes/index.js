/**
 * @index.js - manages all routing
 *
 * router.get when assigning to a single request
 * router.use when deferring to a controller
 *
 * @requires express
 */

const express = require('express')
const router = express.Router()

// Manage top-level request first
router.get('/', (req, res, next) => {
  res.render('index', { title: 'MVC' })
})

router.get('/index', (req, res, next) => {
  res.render('index', { title: 'MVC' })
})

// Route requests that start with an expression to a controller
router.use('/about', require('../controllers/about.js'))
router.use('/customer', require('../controllers/customer.js'))
router.use('/developer', require('../controllers/developer.js'))
router.use('/orderlineitem', require('../controllers/orderlineitem.js'))
router.use('/order', require('../controllers/order.js'))
router.use('/product', require('../controllers/product.js'))

// catch 404 and forward to error handler
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

// error handler
router.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500)
  res.render('error', { status: err.status, message: err.message })
})

module.exports = router
