import { Telegraf } from 'telegraf'
import logger from "../logger";

export default async function createBot ():Promise<any> {
    const functionName = 'createBot'
    try {
        logger.info(`Created Bot ${functionName}`)
        const bot = new Telegraf(process.env.BOT_TOKEN || '');
        bot.start((ctx)=>{
            console.log(ctx)
            ctx.reply('hola algo')
        })
        bot.command('buscar', (ctx)=>{
            ctx.reply('ejecutaste la funcion buscar')
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
