/** 
*  Customer controller
*  Handles requests related to customers (see routes)
*
* @author Denise Case <dcase@nwmissouri.edu>
*
*/
const express = require('express')
const api = express.Router()
const LOG = require('../utils/logger.js')
const Model = require('../models/customer.js')
const notfoundstring = 'customer not found'

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  LOG.info(`Handling /findall ${req}`)
  Model.find({}, (err, data) => {
    if (err) { return res.end('Error finding all') }
    res.json(data)
  })
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  LOG.info(`Handling /findone ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(`notfoundstring ${id}`) }
    res.json(results[0])
  })
})

// RESPOND WITH VIEWS  --------------------------------------------

// GET /
api.get('/', (req, res) => {
  LOG.info(`Handling GET / ${req}`)
  Model.find({}, (err, data) => {
    if (err) { return res.end('Error') }
    res.locals.customers = data
    res.render('customer/index.ejs')
  })
})

// GET create
api.get('/create', (req, res) => {
  LOG.info(`Handling GET /create ${req}`)
  Model.find({}, (err, data) => {
    if (err) { return res.end('error on create') }
    res.locals.customers = data
    res.locals.customer = new Model()
    res.render('customer/create')
  })
})

// GET /delete/:id
api.get('/delete/:id', (req, res) => {
  LOG.info(`Handling GET /delete/:id ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
    res.locals.customer = results[0]
    return res.render('customer/delete.ejs')
  })
})

// GET /details/:id
api.get('/details/:id', (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
    res.locals.customer = results[0]
    return res.render('customer/details.ejs')
  })
})

// GET one
api.get('/edit/:id', (req, res) => {
  LOG.info(`Handling GET /edit/:id ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR${JSON.stringify(results)}`)
    res.locals.customer = results[0]
    return res.render('customer/edit.ejs')
  })
})

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST /save
api.post('/save', (req, res) => {
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))
  const item = new Model()
  LOG.info(`NEW ID ${req.body._id}`)
  item._id = parseInt(req.body._id)
  item.email = req.body.email
  item.given = req.body.given
  item.family = req.body.family
  item.street1 = req.body.street1
  item.street2 = req.body.street2
  item.city = req.body.city
  item.state = req.body.state
  item.zip = req.body.zip
  item.country = req.body.country
  item.save((err) => {
    if (err) { return res.end('ERROR: item could not be saved') }
    LOG.info(`SAVING NEW item ${JSON.stringify(item)}`)
    return res.redirect('/customer')
  })
})

// POST save with id
api.post('/save/:id', (req, res) => {
  LOG.info(`Handling SAVE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling SAVING ID=${id}`)
  Model.updateOne({ _id: id },
    { // use mongoose field update operator $set
      $set: {
        email: req.body.email,
        given: req.body.given,
        family: req.body.family,
        street1: req.body.street1,
        street2: req.body.street2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country
      }
    },
    (err, item) => {
      if (err) { return res.end(notfoundstring) }
      LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
      LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
      LOG.info(`SAVING UPDATED item ${JSON.stringify(item)}`)
      return res.redirect('/customer')
    })
})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling REMOVING ID=${id}`)
  Model.remove({ _id: id }).setOptions({ single: true }).exec((err, deleted) => {
    if (err) { return res.end(notfoundstring) }
    console.log(`Permanently deleted item ${JSON.stringify(deleted)}`)
    return res.redirect('/customer')
  })
})

module.exports = api
