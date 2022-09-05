import logger from "../logger";
import {getUser} from "./user";
import Product from "../db/models/product";

type User = {
    firstName: string,
    lastName: string,
    index: number | null
    id: string
}

export const getProduct = async (data: any) => {
    const functionName = 'getProduct'
    try {
      const user: User = await getUser(data)
      await Product.create({
          index: await generateProductIndex(user),
          product: data.formatMessageProduct,
          response: ['aqui la response del scrpaing'],
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
