'use strict'
const bcrypt = require('bcrypt')
const saltRounds = 10

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static async hash_password (password) {
      const hash = await bcrypt.hash(password, saltRounds)
      return hash
    }

    async check_password (password) {
      const result = await bcrypt.compare(password, this.password)
      return result
    }

    static associate (models) {
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
