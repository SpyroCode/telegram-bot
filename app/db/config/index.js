const defaults = require('./defaults')
const defaultTimezone = defaults('DEFAULT_TIMEZONE')

const production = Object.freeze({
  dialect: defaults('DB_DIALECT'),
  host: defaults('DB_HOST'),
  port: defaults('DB_PORT'),
  database: defaults('DB_DATABASE'),
  username: defaults('DB_USER'),
  password: defaults('DB_PASSWORD'),
  logging: false,
  timezone: defaultTimezone
})

const development = Object.freeze({
  dialect: defaults('DEV_DB_DIALECT'),
  host: defaults('DEV_DB_HOST'),
  port: defaults('DEV_DB_PORT'),
  database: defaults('DEV_DB_DATABASE'),
  username: defaults('DEV_DB_USER'),
  password: defaults('DEV_DB_PASSWORD'),
  logging: defaults('DEV_DB_LOGGING', true) ? console.log : false,
  timezone: defaultTimezone
})

const test = Object.freeze({
  dialect: defaults('TEST_DB_DIALECT'),
  host: defaults('TEST_DB_HOST'),
  port: defaults('TEST_DB_PORT'),
  database: defaults('TEST_DB_DATABASE'),
  username: defaults('TEST_DB_USER'),
  password: defaults('TEST_DB_PASSWORD'),
  timezone: defaultTimezone
})

module.exports = { production, development, test }
