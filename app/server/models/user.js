'use strict'
const bcrypt = require('bcrypt')
const saltRounds = 10

const ApplicationModel = require('./application_model')

module.exports = (sequelize, DataTypes) => {
  class User extends ApplicationModel {
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'username cant be null'
        },
        isAlphanumeric: {
          args: true,
          msg: 'username must only contain alphanumeric characters'
        },
        len: {
          args: [3, 16],
          msg: 'username must contain between 2 and 100 characters.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cant be a empty string'
        },
        notNull: {
          args: true,
          msg: 'password cant be null'
        },
        len: {
          args: [6, 32],
          msg: 'password must contain between 6 and 32 characters.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
