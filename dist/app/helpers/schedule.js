"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const logger_1 = __importDefault(require("../logger"));
const axios_1 = __importDefault(require("axios"));
const subscription_1 = require("../functions/subscription");
const user_1 = require("../functions/user");
const format_1 = require("../utils/format");
const scheduleCron = () => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'helpers.scheduleCron';
    logger_1.default.info(`Started function ${functionName}`);
    try {
        node_cron_1.default.schedule('59 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
            logger_1.default.info(`running a task scraping notification every hour ${functionName}`);
            const getResultSubscriptions = yield (0, subscription_1.executeFinderSubscription)();
            for (const result of getResultSubscriptions) {
                const message = `Hola tienes resultados de tus suscripciones de sitio ${(0, format_1.formatText)(result.siteCode)} /verresultados`;
                const user = yield (0, user_1.getUserById)(result.userId);
                yield sendNotification(message, 'text', user.telegramId);
            }
            logger_1.default.info(`Finished function ${functionName}`);
        }));
    }
    catch (err) {
        logger_1.default.error(`Error for scheduleCron ${functionName}`);
        throw new Error(err);
    }
});
exports.scheduleCron = scheduleCron;
const sendNotification = (msn, type, chatId = '', image = 'https://s.tcdn.co/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/19.png') => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'helpers.sendNotification';
    try {
        const configTelegram = {
            baseURL: process.env.TELEGRAM_API_BOT || '',
            token: process.env.BOT_TOKEN || '',
            chat_id: chatId,
            parse_mode: 'MarkdownV2',
        };
        logger_1.default.info(`Started function ${functionName}`);
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
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        yield axios_1.default.get(url.href);
    }
    catch (err) {
        console.log(err);
        logger_1.default.error(`Error for scheduleCron ${functionName}`);
    }
});
//# sourceMappingURL=schedule.js.map