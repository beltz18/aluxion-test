const app  = require('./controllers/app.js')
const v    = require('../global/var.js')
const mongo= require('mongoose')

const __init__ = () => {
  mongo.connect(v.MONGO_URI, {})
    .then(() => {
      console.log('Connected to Mongo succesfully')
      app().listen(v.PORT, (err) => {
        if (err) throw err
        console.log(`Connection established on PORT: ${v.PORT}`)
      })
    })
    .catch((err) => {
      console.log(Error(err))
      console.log('Error intentando conectar a la base de datos')
    })
}

__init__()