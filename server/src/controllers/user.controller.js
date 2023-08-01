import User from "../schema/user.js"

async function regUser (name, email, password) {
  const thisUsr = await getUser(email)
  if (thisUsr) return { 'message': 'Email already taken', 'status': false }
  else {
    const dbUser  = new User({ name, email, password })
    if (dbUser.save()) return { 'message': 'user created', 'status': true }
    return { 'message': 'Error trying to insert user', 'status': false }
  }
}

async function getUser (email) {
  const user = await new Promise((resolve, reject) => {
    User.findOne({ email })
      .then((res)  => { return resolve(res) })
      .catch((err) => { return reject(err) })
  })
  return user
}

async function logUser () {
  return
}

async function forgotPsw () {
  return
}

export { regUser, logUser, forgotPsw }