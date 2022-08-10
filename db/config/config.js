const { ConnectionString } = require('connection-string')
require('dotenv').config()

const databaseUri = new ConnectionString(process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432')

const appName = require('../../package.json').name

const defaultConfig = {
  username: databaseUri.user,
  password: databaseUri.password,
  database: databaseUri?.path?.[0],
  host: databaseUri.hosts[0].name,
  port: databaseUri.hosts[0].port,
  dialect: 'postgres'
}

module.exports = {
  development: {
    ...defaultConfig,
    database: databaseUri?.path?.[0] || `${appName}_development`
  },
  test: {
    ...defaultConfig,
    database: databaseUri?.path?.[0] || `${appName}_test`,
    logging: false
  },
  production: {
    ...defaultConfig,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}
