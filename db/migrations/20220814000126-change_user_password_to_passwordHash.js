'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Users', 'password', 'passwordHash')
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Users', 'passwordHash', 'password')
  }
}
