import { Telegraf } from 'telegraf'
import logger from "../logger";
import {getUser} from "./user";
import {getProduct} from "./product";
import {formatProductMessage} from "../utils/format";
import {getSubscriptions} from "./subscription";
import {FormatPhrase} from "../interface/definitionTypes";
import {response} from "express";

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
                const { formatMessageProduct, price }:FormatPhrase = formatProductMessage(message)
                const firstName: string = ctx.message.from.first_name
                const lastName: string = ctx.message.from.last_name || ''
                getProduct({firstName, lastName, formatMessageProduct: formatMessageProduct, price})
                    .then(response => {return response})
                    .then(response => {
                        for (const resp of response) {
                            ctx.reply(`${resp.name}`)
                            ctx.reply(`$${resp.price}`)
                            ctx.reply(`${resp.description}`)
                            ctx.reply(`${resp.image}`)
                            ctx.reply(` ${resp.url}`)
                        }
                    }).catch(() => {
                        ctx.reply(`Error en la búsqueda de ${formatMessageProduct}`)
                })
            }
        })

        bot.command('suscribir', (ctx)=>{
            const message : string = ctx.message.text
            const validate : string = message.split(' ')[1]
            const { formatMessageProduct, price }: FormatPhrase = formatProductMessage(message)
            if (!validate! || !price) {
                ctx.reply(`debes introducir /suscribir seguido del producto a buscar y un precio`)
            } else {
                const firstName: string = ctx.message.from.first_name
                const lastName: string = ctx.message.from.last_name || ''
                getSubscriptions({firstName, lastName, formatMessageProduct: formatMessageProduct, price})
                    .then(response => {
                        return response
                    })
                    .then((dataValues) => {
                        ctx.reply(`has sido suscrito con los siguientes datos ${dataValues.product} con el precio de ${dataValues.price} tu folio es ${dataValues.index} en breve recibirás las notificaciones`)
                    }).catch(() => {
                    ctx.reply(`Error en la suscripcion de ${formatMessageProduct}`)
                })
            }
        })
        bot.launch();
    } catch (error: any) {
        logger.error(`Error for created Bot ${functionName}`)
        throw new Error( error )
    }
}
