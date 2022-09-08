import logger from "../logger";
import {getUser} from "./user";
import Product from "../db/models/product";
import {scrapingProduct} from "../helpers/scraping";
import {User} from "../interface/definitionTypes";
import {Model} from "sequelize";
import {refactorProductSearch, replaceValueForString} from "../utils/format";
import {getSites} from "./sites";

export const getProduct = async (data: any):Promise<boolean> => {
    const functionName = 'functions.getProduct'
    try {
      logger.info(`Started function ${functionName}`)
      const getEnabledSites: Array<Model["_attributes"]> = await getSites()
      const user: User = await getUser(data)
      const previousResponse: Model | null = await Product.findOne({
          where: {
             product: data.formatMessageProduct,
             userId: user.id,
             active: true
          }
      })
      if (previousResponse)  await previousResponse.update({active: false})
      let response: {} = {}
      for (const site of getEnabledSites) {
          response = await scrapingProduct(
              replaceValueForString(refactorProductSearch(data.formatMessageProduct), site.url),
              data.formatMessageProduct,
              data.configuration
          )
          await Product.create({
              index: await generateProductIndex(user),
              product: data.formatMessageProduct,
              price: data.price,
              response,
              siteCode: site.code,
              userId: user.id
          })
      }
      return response ? !!response : false
    } catch (err: any) {
        logger.error(`Error en function ${functionName}`)
        throw new Error( err )
    }
}

export const getProductResponse = async (data: any):Promise<any> => {
    const functionName = 'functions.getProductResponse'
    try {
      logger.info(`Started function ${functionName}`)
      const user: User = await getUser(data)
        const productResponse: Model["_attributes"] | null = await Product.findAll({
            where: {
                product: data.formatMessageProduct,
                userId: user.id,
                active: true
            }
        })
        return productResponse.map((resp: { siteCode: string; response: Array<any>; }) => {
            return {
                siteCode: resp.siteCode,
                coincidences: resp.response
            }
        })
    } catch (err: any) {
        logger.error(`Error en function ${functionName}`)
        throw new Error( err )
    }
}

async function generateProductIndex (user: User) {
    const functionName = 'functions.generateUserIndex'
    try {
        const { count } = await Product.findAndCountAll({ where: { active: true, userId: user.id}})
        return  count + 1
    } catch (err: any) {
        logger.error(`Error for generateUserIndex ${functionName}`)
        throw new Error( err )
    }
}
