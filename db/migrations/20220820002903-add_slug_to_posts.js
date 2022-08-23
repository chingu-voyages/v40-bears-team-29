'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'Posts',
        'slug',
        {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
        }
      ),
    ]
  },

  async down (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Posts', 'slug')
    ]
  }
};
