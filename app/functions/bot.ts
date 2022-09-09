import {Context, Telegraf} from 'telegraf'
import logger from "../logger";
import {getUser} from "./user";
import {getProduct, getProductResponse} from "./product";
import {formatMoney, formatProductMessage, valueToNumber} from "../utils/format";
import {getSubscriptions} from "./subscription";
import {FormatPhrase} from "../interface/definitionTypes";

export default async function createBot ():Promise<any> {
    const functionName = 'functions.createBot'
    try {
        logger.info(`Created Bot ${functionName}`)
        const bot = new Telegraf(process.env.BOT_TOKEN || '');
         bot.start((ctx)=>{
            const firstName: string = ctx.message.from.first_name
            const lastName: string = ctx.message.from.last_name || ''
            const telegramId: number = ctx.message.from.id
            getUser({firstName, lastName, telegramId}).then(response =>{
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
                const telegramId: number = ctx.message.from.id
                ctx.reply(`buscando...`)
                getProduct({firstName, lastName, telegramId, formatMessageProduct: formatMessageProduct, price})
                    .then(()=>{
                        getProductResponse({firstName, lastName, telegramId, formatMessageProduct: formatMessageProduct, price}).then(response => {return response})
                            .then(response => {
                                // for (const resp of response) {
                                //     ctx.reply(`Para ${resp.siteCode} estas búsquedas :`)
                                //     for (const product of resp.coincidences) {
                                //         ctx.reply(`${product.name}`)
                                //         ctx.reply(`$${product.price}`)
                                //         ctx.reply(`${product.description}`)
                                //         ctx.reply(`${product.image}`)
                                //         ctx.reply(` ${product.url}`)
                                //     }
                                // }
                                validateResponse(response, ctx)
                            })
                    })
                    .catch(() => {
                        ctx.reply(`Error en la búsqueda de ${formatMessageProduct} vuelve a intentarlo`)
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
                const telegramId: number = ctx.message.from.id
                getSubscriptions({firstName, lastName, telegramId, formatMessageProduct: formatMessageProduct, price})
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
        const validateResponse = (response:Array<any>, ctx: any) => {
            const functionName = 'validateResponse'
            try {
                const message : string = ctx.message.text
                const { formatMessageProduct }: FormatPhrase = formatProductMessage(message)
                const messageSend = `Encontramos estos resultados para  : ${formatMessageProduct}`
                const result = []
                for (const resp of response) {
                    result.push({text: resp.siteCode, callback_data: resp.siteCode })
                }
                bot.telegram.sendMessage(ctx.chat.id, messageSend, {
                    reply_markup: {
                        inline_keyboard: [
                            result
                        ]
                    }
                })
                bot.action('MERCADO-LIBRE', ctx => {
                    const result = response.find(el => el.siteCode === 'MERCADO-LIBRE')
                    const iterator: Array<any> = refactorResponse(result)
                    for (const product of iterator) {
                        ctx.reply(`${product.name}`)
                        ctx.reply(`Precio ${product.price}`)
                        ctx.reply(`${product.description}`)
                        ctx.reply(`${product.image}`)
                        ctx.reply(`${product.url}`)
                    }
                    ctx.answerCbQuery()
                })

                bot.action('ALIBABA', ctx => {
                    const result = response.find(el => el.siteCode === 'ALIBABA')
                    const iterator: Array<any> = refactorResponse(result)
                    for (const product of iterator) {
                        ctx.reply(`${product.name}`)
                        ctx.reply(`Precio ${product.price}`)
                        ctx.reply(`${product.description}`)
                        ctx.reply(`${product.image}`)
                        ctx.reply(`${product.url}`)
                    }
                    ctx.answerCbQuery()
                })

                bot.action('AMAZON', ctx => {
                    const result = response.find(el => el.siteCode === 'AMAZON')
                    const iterator: Array<any> = refactorResponse(result)
                    for (const product of iterator) {
                        ctx.reply(`${product.name}`)
                        ctx.reply(`Precio ${product.price}`)
                        ctx.reply(`${product.description}`)
                        ctx.reply(`${product.image}`)
                        ctx.reply(`${product.url}`)
                    }
                    ctx.answerCbQuery()
                })



            }catch (err: any) {
                logger.error(`Error for created Bot ${functionName}`)
                throw new Error( err )
            }
        }


        bot.launch();
    } catch (error: any) {
        logger.error(`Error for created Bot ${functionName}`)
        throw new Error( error )
    }
}

const refactorResponse = (resp: any):Array<any> => {
    const totalResult: number = 15
    const result: Array<any> = []
    const iterator: Array<any> = resp.coincidences
    for (let i = 0; i<= totalResult; i++){
        result.push({...iterator[i], price: formatMoney(valueToNumber(iterator[i].price))})
    }

   return result
}


