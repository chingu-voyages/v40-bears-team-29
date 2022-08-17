'use strict'

const ApplicationModel = require('./application_model')

module.exports = (sequelize, DataTypes) => {
  class Upvote extends ApplicationModel {
    getData () {
      const data = this.toJSON()
      if (this.User?.constructor?.name === 'User') {
        data.User = this.User.getData()
      }
      return data
    }

    static associate (models) {
      models.Upvote.Post = models.Upvote.belongsTo(models.Post, { foreignKey: 'PostId' })
      models.Upvote.User = models.Upvote.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  }
  Upvote.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Posts', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'Upvote'
  })
  return Upvote
}
