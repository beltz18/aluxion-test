const bcrypt = require('bcrypt')
const User   = require('../schema/user.js')

async function regUser (name, email, password) {
  const thisUsr = await getUser(email)
  if (thisUsr) return { 'message': 'Email already taken', 'status': false }
  else {
    const dbUser  = User({ name, email, password })
    if (dbUser.save()) return { 'message': 'user created', 'status': true }
    return { 'message': 'Error trying to insert user', 'status': false }
  }
}

async function getUser (email) {
  const user = await new Promise((resolve, reject) => {
    User.findOne({ email })
      .then((res)  => { return resolve(res) })
      .catch((err) => { return reject(err)  })
  })
  return user
}

async function logUser (email, password) {
  const user = await getUser(email)

  if (user) {
    const authUser = await bcrypt.compare(password, user.password)
    if (authUser) {
      user.password = undefined
      return { 'message': 'User authenticated', 'status': true, 'data': user }
    } else return { 'message': 'Incorrect password', 'status': false }
  } else {
    return { 'message': 'This user doesnt exists', 'status': false }
  }
}

async function forgotPsw () {
  return
}

module.exports = { regUser, getUser, logUser, forgotPsw }