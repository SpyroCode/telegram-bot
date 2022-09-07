import User from './user'
import Product from "./product";
import Subscription from "./subscription";
import Site from "./sites"
module.exports = () => {
    return {
        User,
        Product,
        Subscription,
        Site
    }
}
