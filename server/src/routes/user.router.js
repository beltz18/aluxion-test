const { Router } = require('express')
const bcrypt     = require('bcrypt')

const {
  regUser,
  logUser,
  forgotPsw,
} = require('../controllers/user.controller.js')

const userRouter = Router()

userRouter.post('/user/register', async (req,res) => {
  let { name, email, password } = req.body
  const salt   = bcrypt.genSaltSync(10)
  const hashed = await bcrypt.hash(password, salt)
  const user   = await regUser(name, email, hashed)
  res.json(user)
})

userRouter.post('/user/login', async (req, res) => {
  const { email, password } = req.body
  const authUser            = await logUser(email, password)
  res.json(authUser)
})

userRouter.post('/user/forgotPassword')

module.exports = userRouter