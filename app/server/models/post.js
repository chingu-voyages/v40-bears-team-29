'use strict'

const ApplicationModel = require('./application_model')

module.exports = (sequelize, DataTypes) => {
  class Post extends ApplicationModel {
    static associate (models) {
      models.Post.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  }
  Post.init({
    title: DataTypes.STRING,
    upvotesCount: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'Post'
  })
  return Post
}
