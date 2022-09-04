'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const schema = 'operations'
    const operation = `CREATE SCHEMA IF NOT EXISTS "${schema}";`
    return queryInterface.sequelize.query(operation)
  },

  async down (queryInterface, Sequelize) {
    const schema = 'operations'
    const operation = `DROP SCHEMA IF EXISTS "${schema}";`
    return queryInterface.sequelize.query(operation)
  }
};
