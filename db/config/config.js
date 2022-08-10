const fs = require('fs');
const { ConnectionString } = require("connection-string");
require("dotenv").config();

const database_uri = new ConnectionString(process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432");

const app_name = require('../../package.json').name

const default_config = {
  username: database_uri.user,
  password: database_uri.password,
  database: database_uri?.path?.[0],
  host: database_uri.hosts[0].name,
  port: database_uri.hosts[0].port,
  dialect: "postgres"
}

module.exports = {
  development: {
    ... default_config,
    database: database_uri?.path?.[0] || `${app_name}_development`,
  },
  test: {
    ... default_config,
    database: database_uri?.path?.[0] || `${app_name}_test`,
    logging: false
  },
  production: {
    ... default_config,
    dialectOptions: {
      ssl:{
        require:true,
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
