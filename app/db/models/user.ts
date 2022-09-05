import { DataTypes} from 'sequelize'
import db from '../connection'

const User = db.define('user', {
    id: {
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4,
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    firstName: {
        field: 'first_name',
        type: DataTypes.STRING,
    },
    lastName: {
        field: 'last_name',
        type: DataTypes.STRING,
    },
    active: {
        field: 'is_active',
        type: DataTypes.BOOLEAN,
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE
    }
}, { tableName: 'users', schema: 'operations'})

export default User
