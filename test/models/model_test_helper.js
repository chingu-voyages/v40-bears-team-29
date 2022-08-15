const { User } = require('../../app/server/models/index')

const validate = async (obj) => {
  let hasError = false

  await obj.validate()
    .catch((err) => {
      hasError = User.formatError(err)
    })

  return hasError
}

module.exports = { validate }
