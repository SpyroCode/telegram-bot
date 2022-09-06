import logger from "../logger";
import {getUser} from "./user";
import Subscription from "../db/models/subscription";
import {scrapingProduct} from "../helpers/scraping";
import {Suscription, User as UserType, User} from "../interface/definitionTypes";
import {Model} from "sequelize";

export const getSubscriptions = async (data: any): Promise<Suscription> => {
    const functionName = 'getSubscriptions'
    try {
      logger.info(`Started function ${functionName}`)
        const suscription: Suscription = {
            index: null,
            product: '',
            price: null,
            date: null
        }
      const user: User = await getUser(data)
      const result: Model = await Subscription.create({
          index: await generateSubscriptionsIndex(user),
          product: data.formatMessageProduct,
          price: data.price,
          response: await scrapingProduct(data.formatMessageProduct),
          userId: user.id
      })

      suscription.index = result.index || null
      suscription.product = result.product || ''
      suscription.price = result.price  || null
      suscription.date = result.createdAt || null
      return suscription
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
