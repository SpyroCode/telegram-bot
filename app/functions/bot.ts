import { Telegraf } from 'telegraf'
import logger from "../logger";
import {getUser} from "./user";

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
            const product : string = message.split(' ')[1]
            if (!product) {
                ctx.reply(`debes introducir /buscar seguido del producto a buscar`)
            } else {
                ctx.reply(`producto a buscar ${product}`)
            }
        })

        bot.command('suscribir', (ctx)=>{
            ctx.reply('ejecutaste la funcion suscribir')
        })
        bot.launch();
    } catch (error: any) {
        logger.error(`Error for created Bot ${functionName}`)
        throw new Error( error )
    }
}
