const session = require('supertest-session')
const { User } = require('../../app/server/models/index')

const logUser = async (user, app) => {
  const plainPassword = user.password
  user.password = await User.hashPassword(user.password)
  await user.save()

  const authenticatedSession = session(app)
  await authenticatedSession.post('/api/login')
    .send({ username: user.username, password: plainPassword })

  return authenticatedSession
}

module.exports = { logUser }
