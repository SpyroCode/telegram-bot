'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('subscription_response', {
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
          subscription_id: {
            type: Sequelize.DataTypes.UUID,
            references: {
                model: {
                    tableName: 'subscriptions',
                    schema: 'operations'
                },
                key: 'id'
            },
            allowNull: false
          },
          response: Sequelize.DataTypes.JSONB,
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
    return await queryInterface.dropTable('subscription_responses');
  }
};
