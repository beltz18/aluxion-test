import { Router } from 'express'
import bcrypt     from 'bcrypt'

const userRouter = Router()

userRouter.post('/user/register', async (req,res) => {
  let { nam, ema, psw } = req.body
  psw = await bcrypt.hash(psw, 10)

  res.json({
    'message': 'user data received!',
    'status': true,
    'user': { nam, ema, psw }
  })
})

userRouter.post('/user/login')

userRouter.post('/user/forgotPassword')

export default userRouter