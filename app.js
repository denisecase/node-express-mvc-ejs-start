/**
 * @file app.js
 * The starting point of the application.
 * Express allows us to configure our app and use
 * dependency injection to add it to the http server.
 *
 * The server-side app starts and begins listening for events.
 *
 */

// Module dependencies
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const engines = require('consolidate')
const errorHandler = require('errorhandler')
const chalk = require('chalk')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const LOG = require('./utils/logger.js')

// create express app
const app = express()

// Load environment variables from .env file, where port, API keys, and passwords are configured.
// dotenv.load is depricated in dotenv version>6.4.1
// to check dotenv version in your machine use command "npm dotenv -version"
// If your version is 6.4.1 or below use dotenv.load
// If your version is greater than 6.4.1 use dotenv.config as shown below
dotenv.config({ path: '.env' })
LOG.info('Environment variables loaded into process.env.')

// log port (Heroku issue)
const port = process.env.PORT || 8089
LOG.info(`Running on ${port}`)

// Are we in production or development?
const isProduction = process.env.NODE_ENV === 'production'
LOG.info(`Environment isProduction = ${isProduction}`)

// choose the connection
const dbURI = isProduction ? encodeURI(process.env.ATLAS_URI) : encodeURI(process.env.LOCAL_MONGODB_URI)
LOG.info('MongoDB URL = ' + dbURI)

// get dbName
const DB_NAME = process.env.DB_NAME

// set connection options
const connectionOptions = {
  dbName: DB_NAME,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

// use mongoose to connect & create a default connection
mongoose.connect(dbURI, connectionOptions, (err, client) => {
  if (err) { LOG.error('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)) }
  LOG.info('MongoDB connection succeeded.')
})

// Get the default connection
const connection = mongoose.connection

// Resusable function to seed a collection of documents
function seed (collectionName) {
  LOG.info(`Seeding collection = ${collectionName}`)
  connection.db.collection(collectionName, (err, c) => {
    if (err) { LOG.error('Error adding collection.') }
    c.countDocuments((err, count) => {
      if (err) { LOG.error('Error counting documents in collection.') }
      if (count === 0) { c.insertMany(require('./data/' + collectionName + '.json')) }
    })
    c.find({}).toArray((err, data) => {
      if (err) { LOG.error('Error adding data to collection.') }
      LOG.info(data)
    })
  })
}

// Mongoose connections emit events
connection.once('open', function () {
  LOG.info('MongoDB event open')
  LOG.info(`MongoDB connected ${dbURI}\n`)

  seed('developers')
  seed('customers')
  seed('products')
  seed('orders')
  seed('orderlineitems')

  connection.on('connected', function () {
    LOG.info('MongoDB event connected')
  })
  connection.on('disconnected', function () {
    LOG.warn('MongoDB event disconnected')
  })
  connection.on('reconnected', function () {
    LOG.info('MongoDB event reconnected')
  })
  connection.on('error', function (err) {
    LOG.error('%s MongoDB error: %s', chalk.red('✗'), err)
    process.exit(1)
  })
})

// configure app.settings.............................
app.set('host', process.env.HOST)

// set the root view folder
app.set('views', path.join(__dirname, 'views'))

// specify desired view engine (EJS)
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)

// configure middleware.....................................................
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))

// log every call and pass it on for handling
app.use((req, res, next) => {
  LOG.debug(`${req.method} ${req.url}`)
  next()
})

// specify various resources and apply them to our application
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
app.use(expressLayouts)
app.use(errorHandler()) // load error handler

const routes = require('./routes/index.js')
app.use('/', routes) // load routing to handle all requests
LOG.info('Loaded routing.')

app.use((req, res) => { res.status(404).render('404.ejs') }) // handle page not found errors

// call app.listen to start server
const host = app.get('host')
const env = isProduction ? 'production' : 'development'

app.listen(process.env.PORT || 8089, () => {
  console.log(`\nApp running at http://${host}:${port}/ with ${env} data`)
  console.log('Press CTRL-C to stop\n')
})

module.exports = app
