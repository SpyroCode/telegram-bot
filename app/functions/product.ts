import logger from "../logger";
import {getUser} from "./user";
import Product from "../db/models/product";
import {scrapingProduct} from "../helpers/scraping";
import {ProductResult, User} from "../interface/definitionTypes";
import {Model} from "sequelize";
import {refactorProductSearch, replaceValueForString} from "../utils/format";
import {getSites} from "./sites";

export const getProduct = async (data: any):Promise<any> => {
    const functionName = 'getProduct'
    try {
      logger.info(`Started function ${functionName}`)
      const getEnabledSites: Array<Model["_attributes"]> = await getSites()
      const user: User = await getUser(data)
      const previoResponse: Model | null = await Product.findOne({
          where: {
             product: data.formatMessageProduct,
             userId: user.id,
             active: true
          }
      })
      if (previoResponse)  await previoResponse.update({active: false})
      let response: {} = {}
      for (const site of getEnabledSites) {
          response = await scrapingProduct(
              replaceValueForString(refactorProductSearch(data.formatMessageProduct), site.url),
              data.formatMessageProduct
          )
          await Product.create({
              index: await generateProductIndex(user),
              product: data.formatMessageProduct,
              price: data.price,
              response,
              userId: user.id
          })
      }
      return response ? response : null
    } catch (err: any) {
        logger.error(`Error for created Bot ${functionName}`)
        throw new Error( err )
    }
}

async function generateProductIndex (user: User) {
    const functionName = 'generateUserIndex'
    try {
        const { count } = await Product.findAndCountAll({ where: { active: true, userId: user.id}})
        return  count + 1
    } catch (err: any) {
        logger.error(`Error for generateUserIndex ${functionName}`)
        throw new Error( err )
    }
}
