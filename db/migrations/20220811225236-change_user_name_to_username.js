'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Users', 'name', 'username')
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Users', 'username', 'name')
  }
}
