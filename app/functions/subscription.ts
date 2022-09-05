import logger from "../logger";
import {getUser} from "./user";
import Subscription from "../db/models/subscription";
import {scrapingProduct} from "../helpers/scraping";
import { User } from "../interface/definitionTypes";

export const getSubscriptions = async (data: any) => {
    const functionName = 'getSubscriptions'
    try {
      logger.info(`Started function ${functionName}`)
      const user: User = await getUser(data)
      await Subscription.create({
          index: await generateSubscriptionsIndex(user),
          product: data.formatMessageProduct,
          price: data.price,
          response: await scrapingProduct(data.formatMessageProduct),
          userId: user.id
      })
    } catch (err: any) {
        logger.error(`Error for created Bot ${functionName}`)
        throw new Error( err )
    }
}

async function generateSubscriptionsIndex (user: User) {
    const functionName = 'generateSubscriptionsIndex'
    try {
        const { count } = await Subscription.findAndCountAll({ where: { active: true, userId: user.id}})
        return  count + 1
    } catch (err: any) {
        logger.error(`Error for generateSubscriptionsIndex ${functionName}`)
        throw new Error( err )
    }
}
