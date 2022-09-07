'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('scrap_url', {
      id: {
        type:Sequelize.DataTypes.UUID,
        primaryKey:true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      index: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      code: Sequelize.DataTypes.STRING,
      url: Sequelize.DataTypes.STRING,
      configuration: Sequelize.DataTypes.JSONB,
      is_enabled: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      is_active: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DataTypes.DATE
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE
      }
    }, {schema: 'operations'});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('scrap_url');
  }
};
