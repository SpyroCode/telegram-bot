"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const User = connection_1.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    index: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    telegramId: {
        field: 'telegram_id',
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    firstName: {
        field: 'first_name',
        type: sequelize_1.DataTypes.STRING,
    },
    lastName: {
        field: 'last_name',
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
}, { tableName: 'users', schema: 'operations' });
exports.default = User;
//# sourceMappingURL=user.js.map