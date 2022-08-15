'use strict'
const bcrypt = require('bcrypt')
const saltRounds = 10

const ApplicationModel = require('./application_model')

module.exports = (sequelize, DataTypes) => {
  class User extends ApplicationModel {
    static async hashPassword (password) {
      let hash = null
      await bcrypt.hash(password, saltRounds)
        .then((data) => {
          hash = data
        })
      return hash
    }

    static async getDataFromId (id) {
      const user = await User.findByPk(id)
      return user.get_data()
    }

    async hashPassword () {
      this.passwordHash = await User.hashPassword(this.password)
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
        passwordHash: '[FILTERED]'
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
      type: DataTypes.STRING
      // allowNull: false
    },
    biography: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: {
          args: 255,
          msg: 'biography must contain maximum of 255 characters.'
        }
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: {
          args: 100,
          msg: 'biography must contain maximum of 100 characters.'
        }
      }
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: {
          args: 32,
          msg: 'biography must contain maximum of 32 characters.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
