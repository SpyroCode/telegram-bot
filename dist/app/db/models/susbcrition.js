"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const user_1 = __importDefault(require("./user"));
const Product = connection_1.default.define('user', {
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
    image: sequelize_1.DataTypes.STRING,
    response: sequelize_1.DataTypes.JSONB,
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
}, { tableName: 'product_search', schema: 'operations' });
Product.belongsTo(user_1.default, {
    as: 'user',
    foreignKey: 'user_id'
});
exports.default = Product;
//# sourceMappingURL=susbcrition.js.map