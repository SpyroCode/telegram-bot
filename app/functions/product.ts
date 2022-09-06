import logger from "../logger";
import {getUser} from "./user";
import Product from "../db/models/product";
import {scrapingProduct} from "../helpers/scraping";
import {ProductResult, User} from "../interface/definitionTypes";
import {Model} from "sequelize";

export const getProduct = async (data: any) => {
    const functionName = 'getProduct'
    try {
      logger.info(`Started function ${functionName}`)
      const user: User = await getUser(data)
      const response: Array<ProductResult> = await scrapingProduct(data.formatMessageProduct)
      const previoResponse: Model | null = await Product.findOne({
          where: {
              product: data.formatMessageProduct,
              userId: user.id,
              active: true
          }
      })
      if (response && previoResponse)  await previoResponse.update({active: false})
      await Product.create({
          index: await generateProductIndex(user),
          product: data.formatMessageProduct,
          price: data.price,
          response,
          userId: user.id
      })
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
