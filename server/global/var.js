import dotenv from 'dotenv'
dotenv.config()

const PORT       = process.env.PORT
const SECRET     = process.env.SECRET
const URL_SERVER = process.env.URL_SERVER
const MONGO_URI  = process.env.MONGO_URI
const URL_CLIENT = process.env.URL_CLIENT

export {
  PORT, SECRET, URL_SERVER, URL_CLIENT,
  MONGO_URI,
}