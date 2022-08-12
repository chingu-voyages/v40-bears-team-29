const { User } = require('../models/index')
const { filterParams, currentUser, loginUser } = require('./application_controller')

const signUp = async (req, res) => {
  const user = await getUser(userParams(req))

  user.save()
    .then((data) => {
      res.status(200).send(data.getData())
    })
    .catch((error) => {
      res.status(422).send({ error })
    })
}

const login = async (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then(async (data) => {
      const user = await loginUser(req, data, req.body.password)
      if (user === null) {
        res.status(401).send({ error: 'invalid password' })
      } else {
        res.status(200).send(user.getData())
      }
    })
    .catch(() => {
      res.status(404).send({ error: 'user not found' })
    })
}

const loggedUser = async (req, res) => {
  const user = await currentUser(req)

  if (user === null) {
    res.status(401).send({ error: 'you are not logged' })
  } else {
    res.status(200).send(user.getData())
  }
}

const updateUser = async (req, res) => {
  const user = await currentUser(req)

  const newValues = userParams(req)
  user.set({ ...newValues, password: await User.hashPassword(newValues.password) })

  user.save()
    .then((data) => {
      res.status(200).send(data.getData())
    })
    .catch((error) => {
      res.status(422).send(error)
    })
}

// helpers ///////////////////////////////////////////

const getUser = async (params) => {
  const user = User.build(params)
  await user.hashPassword()
  return user
}

// strong parameters
const userParams = (req) => {
  const permittedParams = [
    'username',
    'password'
    // 'biography',
    // 'displayName'
  ]
  return filterParams(permittedParams, req)
}

module.exports = { login, loggedUser, signUp, updateUser }
