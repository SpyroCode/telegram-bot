import User from './user'
import Product from "./product";
import Subscription from "./subscription";
import Site from "./sites"
import SubscriptionResponse from "./subscription_response"
module.exports = () => {
    return {
        User,
        Product,
        Subscription,
        Site,
        SubscriptionResponse
    }
}
