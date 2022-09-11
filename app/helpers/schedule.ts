import cron from 'node-cron'
import logger from "../logger";
import axios from 'axios';
import {executeFinderSubscription} from "../functions/subscription";
import {ConfigTelegram} from "../interface/definitionTypes";
import {getUserById} from "../functions/user";
import {Model} from "sequelize";
import {formatText} from "../utils/format";

export const scheduleCron = async () => {
    const functionName = 'helpers.scheduleCron'
    logger.info(`Started function ${functionName}`)
    try {
        cron.schedule('30 * * * *',  async () => {
            logger.info(`running a task scraping notification every hour ${functionName}`)
            const getResultSubscriptions: Model["_attributes"] = await executeFinderSubscription()
            for (const result of getResultSubscriptions) {
                const message = `Hola tienes resultados de tus suscripciones de sitio ${formatText(result.siteCode)} /verresultados`
                const user: Model["_attributes"] = await getUserById(result.userId)
                await sendNotification(message, 'text', user.telegramId)
            }
            logger.info(`Finished function ${functionName}`)
        });
    } catch (err: any) {
        logger.error(`Error for scheduleCron ${functionName}`)
        throw new Error( err )
    }
}

const sendNotification = async (
    msn: string,
    type: string,
    chatId: string = '',
    image: string ='https://s.tcdn.co/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/19.png'  ,
) => {
    const functionName = 'helpers.sendNotification'
    try {
        const configTelegram: ConfigTelegram = {
            baseURL: process.env.TELEGRAM_API_BOT || '',
            token: process.env.BOT_TOKEN || '',
            chat_id: chatId,
            parse_mode: 'MarkdownV2',
        }
        logger.info(`Started function ${functionName}`)
        const { baseURL, token, chat_id, parse_mode } = configTelegram;
        const endPoint = type === 'text' ? 'sendMessage' : 'sendSticker';
        const url = new URL(`${baseURL}${token}/${endPoint}`);
        // Imagen de prueba
        const params: any = {
            chat_id: chat_id,
            parse_mode: parse_mode
        };
        const hasText = type === 'text';
        params[hasText ? 'text' : 'sticker'] = hasText ? msn : image;
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        await axios.get(url.href);

    } catch (err: any) {
        console.log(err)
        logger.error(`Error for scheduleCron ${functionName}`)
    }
}

