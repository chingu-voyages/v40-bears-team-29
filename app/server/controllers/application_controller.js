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

module.exports = { filterParams, currentUser, currentUserId, loginUser }
