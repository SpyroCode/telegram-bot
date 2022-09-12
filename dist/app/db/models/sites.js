"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const Site = connection_1.default.define('scrap_url', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    index: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    code: sequelize_1.DataTypes.STRING,
    url: sequelize_1.DataTypes.STRING,
    configuration: sequelize_1.DataTypes.JSONB,
    enabled: {
        field: 'is_enabled',
        type: sequelize_1.DataTypes.BOOLEAN,
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
}, { tableName: 'scrap_url', schema: 'operations' });
exports.default = Site;
//# sourceMappingURL=sites.js.map