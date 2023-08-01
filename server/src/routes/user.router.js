import { Router } from 'express'
import bcrypt     from 'bcrypt'

import {
  regUser,
  logUser,
  forgotPsw,
} from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.post('/user/register', async (req,res) => {
  let { name, email, password } = req.body
  const salt   = bcrypt.genSaltSync(10)
  const hashed = await bcrypt.hash(password, salt)
  const user   = await regUser(name, email, hashed)
  res.json(user)
})

userRouter.post('/user/login')

userRouter.post('/user/forgotPassword')

export default userRouter