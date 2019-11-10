const express = require('express')
const api = express.Router()
const LOG = require('../utils/logger.js')

// Specify the handler for each required combination of URI and HTTP verb

// HANDLE VIEW DISPLAY REQUESTS --------------------------------------------

// GET dev1
api.get('/dev1', (req, res) => {
  LOG.info(`Handling GET /dev1 ${req}`)
  res.render('about/dev1/index.ejs',
    {
      layout: 'layout.ejs'
    })
})

// GET dev2
api.get('/dev2', (req, res) => {
  LOG.info(`Handling GET /dev2 ${req}`)
  res.render('about/dev2/index.ejs',
    {
      layout: 'layout.ejs'
    })
})

// GET dev3
api.get('/dev3', (req, res) => {
  LOG.info(`Handling GET /dev3 ${req}`)
  res.render('about/dev3/index.ejs',
    {
      layout: 'layout.ejs'
    })
})

module.exports = api
