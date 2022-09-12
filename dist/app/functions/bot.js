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
const telegraf_1 = require("telegraf");
const logger_1 = __importDefault(require("../logger"));
const user_1 = require("./user");
const product_1 = require("./product");
const format_1 = require("../utils/format");
const subscription_1 = require("./subscription");
function createBot() {
    return __awaiter(this, void 0, void 0, function* () {
        const functionName = 'functions.createBot';
        try {
            logger_1.default.info(`Created Bot ${functionName}`);
            const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN || '');
            bot.help(ctx => {
                const helpMessage = `
             *Bot para búsqueda de productos*
             /start - Registro de de usuario
             /buscar -seguido del producto a buscar
             /suscribir -Seguido del producto y el precio
             `;
                bot.telegram.sendMessage(ctx.from.id, helpMessage, {
                    parse_mode: 'Markdown'
                });
            });
            bot.start((ctx) => {
                const firstName = ctx.message.from.first_name || '';
                const lastName = ctx.message.from.last_name || '';
                const telegramId = ctx.message.from.id;
                (0, user_1.getUser)({ firstName, lastName, telegramId }).then(response => {
                    return response;
                }).then((dataValues) => {
                    ctx.reply(`Hola ${firstName || ''} ${lastName || ''} tu numero de registro es ${dataValues.index}`);
                });
            });
            bot.command('buscar', (ctx) => {
                const message = ctx.message.text;
                const validate = message.split(' ')[1];
                if (!validate) {
                    ctx.reply(`debes introducir /buscar seguido del producto a buscar`);
                }
                else {
                    const { formatMessageProduct, price } = (0, format_1.formatProductMessage)(message);
                    const firstName = ctx.message.from.first_name;
                    const lastName = ctx.message.from.last_name || '';
                    const telegramId = ctx.message.from.id;
                    ctx.reply(`buscando...`);
                    (0, product_1.getProduct)({ firstName, lastName, telegramId, formatMessageProduct: formatMessageProduct, price })
                        .then(() => {
                        (0, product_1.getProductResponse)({ firstName, lastName, telegramId, formatMessageProduct: formatMessageProduct, price }).then(products => {
                            return products;
                        })
                            .then(elements => {
                            validateResponse(elements, ctx);
                        });
                    })
                        .catch(() => {
                        ctx.reply(`Error en la búsqueda de ${formatMessageProduct} vuelve a intentarlo`);
                    });
                }
            });
            bot.command('suscribir', (ctx) => {
                const message = ctx.message.text;
                const validate = message.split(' ')[1];
                const { formatMessageProduct, price } = (0, format_1.formatProductMessage)(message);
                if (!validate || !price) {
                    ctx.reply(`debes introducir /suscribir seguido del producto a buscar y un precio`);
                }
                else {
                    const firstName = ctx.message.from.first_name;
                    const lastName = ctx.message.from.last_name || '';
                    const telegramId = ctx.message.from.id;
                    (0, subscription_1.getSubscriptions)({ firstName, lastName, telegramId, formatMessageProduct: formatMessageProduct, price })
                        .then(response => {
                        return response;
                    })
                        .then((dataValues) => {
                        ctx.reply(`has sido suscrito con los siguientes datos ${dataValues.product} con el precio de ${dataValues.price} tu folio es ${dataValues.index} en breve recibirás las notificaciones`);
                    }).catch(() => {
                        ctx.reply(`Error en la suscripcion de ${formatMessageProduct}`);
                    });
                }
            });
            bot.command('verresultados', (ctx) => {
                const telegramId = ctx.message.from.id;
                (0, subscription_1.getResultSubscriptions)(telegramId)
                    .then(response => {
                    return response;
                })
                    .then(response => {
                    return response.map(el => {
                        return {
                            siteCode: el.siteCode,
                            coincidences: el.response
                        };
                    });
                })
                    .then(response => {
                    for (const resp of response) {
                        const iterator = refactorResponse(resp);
                        for (const product of iterator) {
                            ctx.reply(`${product === null || product === void 0 ? void 0 : product.name}`);
                            ctx.reply(`Precio ${product === null || product === void 0 ? void 0 : product.price}`);
                            ctx.reply(`${product === null || product === void 0 ? void 0 : product.description}`);
                            ctx.reply(`${product === null || product === void 0 ? void 0 : product.image}`);
                            ctx.reply(`${product === null || product === void 0 ? void 0 : product.url}`);
                        }
                    }
                });
            });
            const validateResponse = (response, ctx) => {
                const functionName = 'validateResponse';
                try {
                    const message = ctx.message.text;
                    const { formatMessageProduct } = (0, format_1.formatProductMessage)(message);
                    const messageSend = `Encontramos estos resultados para  : ${formatMessageProduct}`;
                    const result = [];
                    for (const resp of response) {
                        result.push({ text: resp.siteCode, callback_data: resp.siteCode });
                    }
                    bot.telegram.sendMessage(ctx.chat.id, messageSend, {
                        reply_markup: {
                            inline_keyboard: [
                                result
                            ]
                        }
                    });
                    bot.action('MERCADO-LIBRE', ctx => {
                        const siteCode = ctx.callbackQuery.data || '';
                        const result = response.find(el => el.siteCode === siteCode);
                        const iterator = refactorResponse(result);
                        for (const product of iterator) {
                            ctx.reply(`${product === null || product === void 0 ? void 0 : product.name}`);
                            ctx.reply(`Precio ${product === null || product === void 0 ? void 0 : product.price}`);
                            ctx.reply(`${product === null || product === void 0 ? void 0 : product.description}`);
                            ctx.reply(`${product === null || product === void 0 ? void 0 : product.image}`);
                            ctx.reply(`${product === null || product === void 0 ? void 0 : product.url}`);
                        }
                        ctx.answerCbQuery();
                    });
                    bot.action('ALIBABA', ctx => {
                        const siteCode = ctx.callbackQuery.data || '';
                        const result = response.find(el => el.siteCode === siteCode);
                        const iterator = refactorResponse(result);
                        for (const product of iterator) {
                            ctx.reply(`${product === null || product === void 0 ? void 0 : product.name}`);
                            ctx.reply(`Precio ${product === null || product === void 0 ? void 0 : product.price}`);
                            ctx.reply(`${product === null || product === void 0 ? void 0 : product.description}`);
                            ctx.reply(`${product === null || product === void 0 ? void 0 : product.image}`);
                            ctx.reply(`${product === null || product === void 0 ? void 0 : product.url}`);
                        }
                        ctx.answerCbQuery();
                    });
                }
                catch (err) {
                    logger_1.default.error(`Error for created Bot ${functionName}`);
                    throw new Error(err);
                }
            };
            bot.launch();
        }
        catch (error) {
            logger_1.default.error(`Error for created Bot ${functionName}`);
            throw new Error(error);
        }
    });
}
exports.default = createBot;
const refactorResponse = (resp) => {
    var _a;
    const totalResult = 10;
    const result = [];
    const iterator = resp && resp.coincidences ? resp.coincidences : [];
    for (let i = 0; i <= totalResult; i++) {
        result.push(Object.assign(Object.assign({}, iterator[i]), { price: ((_a = iterator[i]) === null || _a === void 0 ? void 0 : _a.price) && (0, format_1.formatMoney)((0, format_1.valueToNumber)(iterator[i].price)) }));
    }
    return result;
};
//# sourceMappingURL=bot.js.map