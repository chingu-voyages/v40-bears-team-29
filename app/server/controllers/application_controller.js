const { User } = require('../models/index')

const filterParams = (permittedParams, req) => {
  const params = req.body

  const filtered = Object.entries(params).filter(([key, _]) => permittedParams.includes(key))
  return Object.fromEntries(filtered)
}

const currentUser = async (req) => {
  const userId = currentUserId(req)

  let user = null
  if (userId) {
    user = await User.findByPk(userId)
  }
  return user
}

const currentUserId = (req) => {
  return req.session.user_id
}

const loginUser = async (req, user, password) => {
  if (await user.checkPassword(password) === false) {
    return null
  } else {
    req.session.user_id = user.id
    return user
  }
}

const handleError = (err, res, { responseStatus = 422 }) => {
  const formatError = User.formatError(err)
  if (formatError == null) {
    res.status(500).send({ error: 'unexpected error' })
    console.error(err)
  } else {
    res.status(responseStatus).send(formatError)
  }
}

const authenticateUser = (req, res) => {
  if (currentUserId(req) == null) {
    res.status(401).send({ error: 'you are not logged.' })
    return false
  }
  return true
}

module.exports = { filterParams, currentUser, currentUserId, loginUser, handleError, authenticateUser }
