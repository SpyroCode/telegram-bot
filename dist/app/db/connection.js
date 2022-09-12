"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dataConnection_1 = __importDefault(require("./config/dataConnection"));
const database = dataConnection_1.default.database || 'postgres';
const dbUser = dataConnection_1.default.username || '';
const dbPassword = dataConnection_1.default.password || '';
const dbHost = dataConnection_1.default.host || 'localhost';
const dbDriver = dataConnection_1.default.dialect;
const logging = dataConnection_1.default.logging || false;
const db = new sequelize_1.Sequelize(database, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: logging
});
exports.default = db;
//# sourceMappingURL=connection.js.map