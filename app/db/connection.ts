import { Sequelize } from 'sequelize'
import dataConnection from "./config";

const database: string = dataConnection.database || 'postgres'
const dbUser: string = dataConnection.username || ''
const dbPassword: string = dataConnection.password || ''
const dbHost: string = dataConnection.host || 'localhost'
const configDialect: string = dataConnection.dialect || ''
const logging: boolean = dataConnection.logging || false
const db = new Sequelize(database, dbUser, dbPassword, {
    host: dbHost,
    dialect: configDialect,
    logging: logging
})

export default db;
