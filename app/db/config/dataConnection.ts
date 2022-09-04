import dotenv from "dotenv";
dotenv.config();


const defaults = {
    DB_DRIVER: 'postgres',
    DB_HOST: 'localhost',
    DB_PORT: '5432',
    DEFAULT_TIMEZONE: 'UTC'
}


const dataConnection = Object.freeze({
    dialect: process.env.DB_DIALECT || defaults.DB_DRIVER,
    host: process.env.DB_HOST || defaults.DB_HOST,
    port: process.env.DB_PORT || defaults.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false,
    timezone: defaults.DEFAULT_TIMEZONE
})

export default dataConnection
