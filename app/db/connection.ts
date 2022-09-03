import { Sequelize } from 'sequelize'

const db = new Sequelize('node', 'root', 'r007', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
})

export default db;
