import { Sequelize } from 'sequelize'

const db = new Sequelize('challenge_bot', 'challenge-user', 'dOcFF29D4dxjyqF1BeGRA', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
})

export default db;
