import dotenv from 'dotenv'
dotenv.config()

const PORT       = process.env.PORT
const SECRET     = process.env.SECRET
const URL_SERVER = process.env.URL_SERVER

export {
  PORT, SECRET, URL_SERVER
}