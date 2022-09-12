"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const user_1 = __importDefault(require("./user"));
const Subscription = connection_1.default.define('subscriptions', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    index: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    product: sequelize_1.DataTypes.STRING,
    price: sequelize_1.DataTypes.FLOAT,
    image: sequelize_1.DataTypes.STRING,
    userId: {
        field: 'user_id',
        type: sequelize_1.DataTypes.UUID,
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
}, { tableName: 'subscriptions', schema: 'operations' });
Subscription.belongsTo(user_1.default, {
    as: 'user',
    foreignKey: 'user_id'
});
exports.default = Subscription;
//# sourceMappingURL=subscription.js.map