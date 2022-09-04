require('dotenv').config()

const dbDefaults = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
  database: 'challenge_bot'
}

const defaults = {
  DEFAULT_TIMEZONE: 'UTC',
  DB_DIALECT: dbDefaults.dialect,
  DB_HOST: dbDefaults.host,
  DB_PORT: dbDefaults.port,
  DB_DATABASE: dbDefaults.database,
  DEV_DB_DIALECT: dbDefaults.dialect,
  DEV_DB_HOST: dbDefaults.host,
  DEV_DB_PORT: dbDefaults.port,
  DEV_DB_DATABASE: dbDefaults.database,
  TEST_DB_DIALECT: dbDefaults.dialect,
  TEST_DB_HOST: dbDefaults.host,
  TEST_DB_PORT: dbDefaults.port,
  TEST_DB_DATABASE: dbDefaults.database
}

const getValue = function (key, isFlag) {
  let value = process.env[key]
  if (typeof value === 'undefined') value = defaults[key]
  if (isFlag) return (value === 'true')
  return value
}

module.exports = getValue
