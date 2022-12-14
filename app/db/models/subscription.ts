import { DataTypes} from 'sequelize'
import db from '../connection'
import User from "./user";

const Subscription = db.define('subscriptions', {
    id: {
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4,
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING,
    userId: {
        field: 'user_id',
        type: DataTypes.UUID,
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
}, { tableName: 'subscriptions', schema: 'operations'})
Subscription.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
})

export default Subscription
