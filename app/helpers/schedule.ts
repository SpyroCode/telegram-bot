import cron from 'node-cron'
import logger from "../logger";
import axios from 'axios';
import {executeFinderSubscription} from "../functions/subscription";
import {ConfigTelegram} from "../interface/definitionTypes";

export const scheduleCron = async () => {
    const functionName = 'helpers.scheduleCron'
    logger.info(`Started function ${functionName}`)
    try {
        cron.schedule('44 * * * *',  async () => {
            logger.info(`running a task scraping notification every hour ${functionName}`)
            await executeFinderSubscription()
            const chatId = '1085356873'
            const message = 'Hola tienes resultados de tus suscripciones /verresultados'
            await sendNotification(message, 'text', chatId)
            logger.info(`Finished function ${functionName}`)
        });
    } catch (err: any) {
        logger.error(`Error for scheduleCron ${functionName}`)
        throw new Error( err )
    }
}

const sendNotification = async (
    msn,
    type,
    chatId = '',
    image='https://s.tcdn.co/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/19.png'  ,
) => {
    const functionName = 'helpers.sendNotification'
    try {
        const configTelegram: ConfigTelegram = {
            baseURL: process.env.TELEGRAM_API_BOT,
            token: process.env.BOT_TOKEN,
            chat_id: chatId,
            parse_mode: 'MarkdownV2',
        }
        logger.info(`Started function ${functionName}`)
        const { baseURL, token, chat_id, parse_mode } = configTelegram;
        const endPoint = type === 'text' ? 'sendMessage' : 'sendSticker';
        const url = new URL(`${baseURL}${token}/${endPoint}`);
        // Imagen de prueba
        const params = {
            chat_id: chat_id,
            parse_mode: parse_mode
        };
        const hasText = type === 'text';
        params[hasText ? 'text' : 'sticker'] = hasText ? msn : image;
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        await axios.get(url.href);

    } catch (err) {
        console.log(err)
        logger.error(`Error for scheduleCron ${functionName}`)
    }
}

