import logger from "../logger";
import {getUser} from "./user";
import Subscription from "../db/models/subscription";
import {ProductResult, Suscription, User} from "../interface/definitionTypes";
import {Model} from "sequelize";
import {getSites} from "./sites";
import {scrapingProduct} from "../helpers/scraping";
import {formatMoney, refactorProductSearch, replaceValueForString, valueToNumber} from "../utils/format";

export const getSubscriptions = async (data: any): Promise<Suscription> => {
    const functionName = 'functions.getSubscriptions'
    try {
      logger.info(`Started function ${functionName}`)
        const suscription: Suscription = {
            index: null,
            product: '',
            price: null,
            date: null
        }
      const user: User = await getUser(data)
        let result: Model["_attributes"];
        const previoResponse: Model | null = await Subscription.findOne({
            where: {
                product: data.formatMessageProduct,
                price: data.price,
                userId: user.id,
                active: true
            }
        })
        if (previoResponse)  await previoResponse.update({active: false})
        result = await Subscription.create({
            index: await generateSubscriptionsIndex(user),
            product: data.formatMessageProduct,
            price: data.price,
            userId: user.id
        });

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

export const executeFinderSubscription = async () => {
    const functionName = 'executeFinderSubscription'
    try {
        const getEnabledSites: Array<Model["_attributes"]> = await getSites()
        const subscriptions: Array<Model["_attributes"]> = await Subscription.findAll({ where: { active: true } })
        for (const subscription of subscriptions) {
            for (const site of getEnabledSites) {
                const response: Array<ProductResult> = await scrapingProduct(
                    replaceValueForString(refactorProductSearch(subscription.product), site.url),
                    subscription.product,
                    site.configuration
                )
                if(response) {
                    const filterResponse: Array<ProductResult> = response.filter((el: any) => subscription.price >= valueToNumber(el.price))
                    if(filterResponse){
                       // filter code
                    }
                }
            }
        }
    } catch (err: any) {
        console.log(err)
        logger.error(`Error for executeFinderSubscription ${functionName}`)
        throw new Error( err )
    }
}
