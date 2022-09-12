"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const defaults = {
    DB_DRIVER: 'postgres',
    DB_HOST: 'localhost',
    DB_PORT: '5432',
    DEFAULT_TIMEZONE: 'UTC'
};
const dataConnection = Object.freeze({
    dialect: process.env.DB_DIALECT || defaults.DB_DRIVER,
    host: process.env.DB_HOST || defaults.DB_HOST,
    port: process.env.DB_PORT || defaults.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false,
    timezone: defaults.DEFAULT_TIMEZONE
});
exports.default = dataConnection;
//# sourceMappingURL=index.js.map