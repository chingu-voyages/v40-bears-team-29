'use strict'
const bcrypt = require('bcrypt')
const saltRounds = 10

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static async hashPassword (password) {
      const hash = await bcrypt.hash(password, saltRounds)
      return hash
    }

    static async getDataFromId (id) {
      const user = await User.findByPk(id)
      return user.get_data()
    }

    async hashPassword () {
      if (this.hasHashedPassword() === false) {
        this.password = await User.hashPassword(this.password)
      }
    }

    hasHashedPassword () {
      return this.password.substring(0, 3) === '$2b'
    }

    getData () {
      const data = {
        ...this.toJSON(),
        password: '[FILTERED]',
        avatar: '',
        biography: '',
        display_name: ''
      }
      return data
    }

    async checkPassword (password) {
      const result = await bcrypt.compare(password, this.password)
      return result
    }

    static associate (models) {
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
