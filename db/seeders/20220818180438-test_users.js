'use strict'
const models = require('../../app/server/models/index')

const defaultValues = () => {
  return {
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const password = '123456'
    const testPassword = async () => {
      return await models.User.hashPassword(password)
    }

    const users = [
      {
        username: 'user1',
        passwordHash: await testPassword(),
        ...defaultValues()
      },
      {
        username: 'user2',
        passwordHash: await testPassword(),
        ...defaultValues()
      },
      {
        username: 'user3',
        passwordHash: await testPassword(),
        ...defaultValues()
      },
      {
        username: 'user4',
        passwordHash: await testPassword(),
        ...defaultValues()
      }
    ]
    // console.log(users)

    await queryInterface.bulkInsert('Users', users, {})
      .catch((e) => { console.log(e) })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
