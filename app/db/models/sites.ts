import { DataTypes} from 'sequelize'
import db from '../connection'

const Site = db.define('scrap_url', {
    id: {
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4,
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    code: DataTypes.STRING,
    url: DataTypes.STRING,
    configuration: DataTypes.JSONB,
    enabled: {
        field: 'is_enabled',
        type: DataTypes.BOOLEAN,
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
}, { tableName: 'scrap_url', schema: 'operations'})

export default Site
