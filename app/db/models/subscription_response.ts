import { DataTypes} from 'sequelize'
import db from '../connection'
import User from "./user";
import Subscription from "./subscription"

const SubscriptionResponse = db.define('subscription_response', {
    id: {
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4,
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        field: 'user_id',
        type: DataTypes.UUID,
    },
    subscriptionId: {
        field: 'subscription_id',
        type: DataTypes.UUID,
    },
    response: DataTypes.JSONB,
    siteCode: {
        field: 'site_code',
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
}, { tableName: 'subscription_response', schema: 'operations'})
SubscriptionResponse.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
})
SubscriptionResponse.belongsTo(Subscription, {
    as: 'subscription',
    foreignKey: 'subscription_id'
})

export default SubscriptionResponse
