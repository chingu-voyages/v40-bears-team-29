'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'Users',
        'biography',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'Users',
        'displayName',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'Users',
        'avatar',
        Sequelize.STRING
      )
    ]
  },

  async down (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn(
        'Users',
        'biography'
      ),
      queryInterface.removeColumn(
        'Users',
        'displayName'
      ),
      queryInterface.removeColumn(
        'Users',
        'avatar'
      )
    ]
  }
}
