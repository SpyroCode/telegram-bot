'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('product_search', {
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
      product: Sequelize.DataTypes.STRING,
      site_code: Sequelize.DataTypes.STRING,
      response: Sequelize.DataTypes.JSONB,
      user_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'users',
            schema: 'operations'
          },
          key: 'id'
        },
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
    return queryInterface.dropTable('product_search');
  }
};
