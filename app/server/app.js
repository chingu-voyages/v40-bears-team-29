// REQUIRES
const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const app = express()
const logger = require('morgan')
const cookieSession = require('cookie-session')

// MIDDLEWARES
app.use(cors({ origin: '*' }))
app.use(logger('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../client/build')))

// session
const cookieSessionConfig = {
  name: 'session',
  keys: [process.env.SECRET_KEY],
  maxAge: 24 * 60 * 60 * 1000 * 365 // a year
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  // cookieSessionConfig.sameSite = true
  cookieSessionConfig.secure = true
  // cookieSessionConfig.httpOnly = false
}
app.use(cookieSession(cookieSessionConfig))

// API ROUTES:
const usersRoute = require('./routes/users_route')
app.use('/', usersRoute)

// CLIENT ROUTES
app.get('*', (req, res) => {
  console.log(__dirname)
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

module.exports = app
