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
exports.getProductResponse = exports.getProduct = void 0;
const logger_1 = __importDefault(require("../logger"));
const user_1 = require("./user");
const product_1 = __importDefault(require("../db/models/product"));
const scraping_1 = require("../helpers/scraping");
const sequelize_1 = require("sequelize");
const format_1 = require("../utils/format");
const sites_1 = require("./sites");
const getProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'functions.getProduct';
    try {
        logger_1.default.info(`Started function ${functionName}`);
        const getEnabledSites = yield (0, sites_1.getSites)();
        if (!getEnabledSites.length)
            return false;
        const user = yield (0, user_1.getUser)(data);
        const previousResponse = yield product_1.default.findAll({
            where: {
                product: data.formatMessageProduct,
                userId: user.id,
                active: true
            }
        });
        for (const finderProduct of previousResponse) {
            yield finderProduct.update({ active: false });
        }
        let response = {};
        for (const site of getEnabledSites) {
            response = yield (0, scraping_1.scrapingProduct)((0, format_1.replaceValueForString)((0, format_1.refactorProductSearch)(data.formatMessageProduct), site.url), data.formatMessageProduct, site.configuration);
            yield product_1.default.create({
                index: yield generateProductIndex(user),
                product: data.formatMessageProduct,
                price: data.price,
                response,
                siteCode: site.code,
                userId: user.id
            });
        }
        return response ? !!response : false;
    }
    catch (err) {
        logger_1.default.error(`Error en function ${functionName}`);
        throw new Error(err);
    }
});
exports.getProduct = getProduct;
const getProductResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'functions.getProductResponse';
    try {
        logger_1.default.info(`Started function ${functionName}`);
        const user = yield (0, user_1.getUser)(data);
        const productResponse = yield product_1.default.findAll({
            where: {
                product: data.formatMessageProduct,
                userId: user.id,
                active: true,
                response: {
                    [sequelize_1.Op.ne]: null
                }
            }
        });
        return productResponse.map((resp) => {
            return {
                siteCode: resp.siteCode,
                coincidences: resp.response
            };
        });
    }
    catch (err) {
        logger_1.default.error(`Error en function ${functionName}`);
        throw new Error(err);
    }
});
exports.getProductResponse = getProductResponse;
function generateProductIndex(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const functionName = 'functions.generateUserIndex';
        try {
            const { count } = yield product_1.default.findAndCountAll({ where: { active: true, userId: user.id } });
            return count + 1;
        }
        catch (err) {
            logger_1.default.error(`Error for generateUserIndex ${functionName}`);
            throw new Error(err);
        }
    });
}
//# sourceMappingURL=product.js.map