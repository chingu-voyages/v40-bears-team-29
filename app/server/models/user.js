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
      this.passwordHash = await User.hashPassword(this.password)
      await this.save()
    }

    hasHashedPassword () {
      if (this.passwordHash) {
        return true
      }
      return false
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
      const result = await bcrypt.compare(password, this.passwordHash)
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
      type: DataTypes.VIRTUAL,
      allowNull: false,
      set (val) {
        this.setDataValue('password', val)
      },
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
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
