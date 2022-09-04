'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('subscriptions', {
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
      price: Sequelize.DataTypes.FLOAT,
      image: Sequelize.DataTypes.STRING,
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
    return queryInterface.dropTable('subscriptions');
  }
};
