import {Dialect, Sequelize} from 'sequelize'
import dataConnection from "./config/dataConnection";

const database: string = dataConnection.database || 'postgres'
const dbUser: string = dataConnection.username || ''
const dbPassword: string = dataConnection.password || ''
const dbHost: string = dataConnection.host || 'localhost'
const dbDriver = dataConnection.dialect as Dialect
const logging: boolean = dataConnection.logging || false
const db = new Sequelize(database, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: logging
})

export default db;
