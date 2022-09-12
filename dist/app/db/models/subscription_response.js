"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const user_1 = __importDefault(require("./user"));
const subscription_1 = __importDefault(require("./subscription"));
const SubscriptionResponse = connection_1.default.define('subscription_response', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    index: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        field: 'user_id',
        type: sequelize_1.DataTypes.UUID,
    },
    subscriptionId: {
        field: 'subscription_id',
        type: sequelize_1.DataTypes.UUID,
    },
    response: sequelize_1.DataTypes.JSONB,
    siteCode: {
        field: 'site_code',
        type: sequelize_1.DataTypes.STRING,
    },
    active: {
        field: 'is_active',
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    createdAt: {
        field: 'created_at',
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        field: 'updated_at',
        type: sequelize_1.DataTypes.DATE
    }
}, { tableName: 'subscription_response', schema: 'operations' });
SubscriptionResponse.belongsTo(user_1.default, {
    as: 'user',
    foreignKey: 'user_id'
});
SubscriptionResponse.belongsTo(subscription_1.default, {
    as: 'subscription',
    foreignKey: 'subscription_id'
});
exports.default = SubscriptionResponse;
//# sourceMappingURL=subscription_response.js.map