import express    from 'express'
import parser     from 'body-parser'
import cors       from 'cors'
import userRouter from '../routes/user.router.js'

const server = express()

const middlewares = () => {
  server.use(parser.json(), parser.urlencoded({ extended: true }))
  server.use(cors({ origin: process.env.URL_CLIENT }))
  server.use(userRouter, )
}

const app = () => {
  middlewares()
  return server
}

export default app