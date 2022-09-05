import { Telegraf } from 'telegraf'
import logger from "../logger";
import {getUser} from "./user";
import {getProduct} from "./product";
import {formatProductMessage} from "../utils/format";
import {getSubscriptions} from "./subscription";

export default async function createBot ():Promise<any> {
    const functionName = 'createBot'
    try {
        logger.info(`Created Bot ${functionName}`)
        const bot = new Telegraf(process.env.BOT_TOKEN || '');
         bot.start((ctx)=>{
            const firstName: string = ctx.message.from.first_name
            const lastName: string = ctx.message.from.last_name || ''
            getUser({firstName, lastName}).then(response =>{
                return response
            }).then((dataValues) => {
                ctx.reply(`Hola ${firstName || ''} ${lastName || ''} tu numero de registro es ${dataValues.index}`)
            })
        })
        bot.command('buscar', (ctx)=>{
            const message : string = ctx.message.text
            const validate : string = message.split(' ')[1]
            if (!validate) {
                ctx.reply(`debes introducir /buscar seguido del producto a buscar`)
            } else {
                const { formatMessageProduct, price } = formatProductMessage(message)
                const firstName: string = ctx.message.from.first_name
                const lastName: string = ctx.message.from.last_name || ''
                getProduct({firstName, lastName, formatMessageProduct: formatMessageProduct, price})
                ctx.reply(`producto a buscar ${formatMessageProduct}`)
            }
        })

        bot.command('suscribir', (ctx)=>{
            const message : string = ctx.message.text
            const validate : string = message.split(' ')[1]
            const { formatMessageProduct, price } = formatProductMessage(message)
            if (!validate! || !price) {
                ctx.reply(`debes introducir /suscribir seguido del producto a buscar y un precio`)
            } else {
                const firstName: string = ctx.message.from.first_name
                const lastName: string = ctx.message.from.last_name || ''
                getSubscriptions({firstName, lastName, formatMessageProduct: formatMessageProduct, price})
                ctx.reply(`producto a buscar ${formatMessageProduct} con el precio de ${price}`)
            }
        })
        bot.launch();
    } catch (error: any) {
        logger.error(`Error for created Bot ${functionName}`)
        throw new Error( error )
    }
}
