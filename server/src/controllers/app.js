import express from 'express'
import parser  from 'body-parser'
import cors    from 'cors'

const server = express()

const middlewares = () => {
  server.use(parser.json(), parser.urlencoded({ extended: true }))
  server.use(cors())
}

const app = () => {
  middlewares()
  return server
}

export default app