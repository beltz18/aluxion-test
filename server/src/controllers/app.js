const express    = require('express')
const parser     = require('body-parser')
const cors       = require('cors')
const swaggerUI  = require('swagger-ui-express')
const userRouter = require('../routes/user.router.js')
const swagger    = require('../../swagger.json')

const server = express()

const middlewares = () => {
  server.use(parser.json(), parser.urlencoded({ extended: true }))
  server.use(cors({ origin: process.env.URL_CLIENT }))
  server.use(userRouter, )
  server.use('/docs', swaggerUI.serve, swaggerUI.setup(swagger))
}

const app = () => {
  middlewares()
  return server
}

module.exports = app