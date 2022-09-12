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
exports.getResultSubscriptions = exports.executeFinderSubscription = exports.getSubscriptions = void 0;
const logger_1 = __importDefault(require("../logger"));
const user_1 = require("./user");
const subscription_1 = __importDefault(require("../db/models/subscription"));
const sites_1 = require("./sites");
const scraping_1 = require("../helpers/scraping");
const format_1 = require("../utils/format");
const subscription_response_1 = __importDefault(require("../db/models/subscription_response"));
const getSubscriptions = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'functions.getSubscriptions';
    try {
        logger_1.default.info(`Started function ${functionName}`);
        const suscription = {
            index: null,
            product: '',
            price: null,
            date: null
        };
        const user = yield (0, user_1.getUser)(data);
        let result;
        const previoResponse = yield subscription_1.default.findOne({
            where: {
                product: data.formatMessageProduct,
                price: data.price,
                userId: user.id,
                active: true
            }
        });
        if (previoResponse)
            yield previoResponse.update({ active: false });
        result = yield subscription_1.default.create({
            index: yield generateSubscriptionsIndex(user),
            product: data.formatMessageProduct,
            price: data.price,
            userId: user.id
        });
        suscription.index = result.index || null;
        suscription.product = result.product || '';
        suscription.price = result.price || null;
        suscription.date = result.createdAt || null;
        return suscription;
    }
    catch (err) {
        logger_1.default.error(`Error for created Bot ${functionName}`);
        throw new Error(err);
    }
});
exports.getSubscriptions = getSubscriptions;
function generateSubscriptionsIndex(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const functionName = 'generateSubscriptionsIndex';
        try {
            const { count } = yield subscription_1.default.findAndCountAll({ where: { active: true, userId: user.id } });
            return count + 1;
        }
        catch (err) {
            logger_1.default.error(`Error for generateSubscriptionsIndex ${functionName}`);
            throw new Error(err);
        }
    });
}
const executeFinderSubscription = () => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'functions.executeFinderSubscription';
    try {
        logger_1.default.info(`Started function ${functionName}`);
        const getEnabledSites = yield (0, sites_1.getSites)();
        const subscriptions = yield subscription_1.default.findAll({ where: { active: true } });
        const getResultSubscriptions = [];
        for (const subscription of subscriptions) {
            for (const site of getEnabledSites) {
                const response = yield (0, scraping_1.scrapingProduct)((0, format_1.replaceValueForString)((0, format_1.refactorProductSearch)(subscription.product), site.url), subscription.product, site.configuration);
                if (response) {
                    const filterResponse = response.filter((el) => subscription.price >= (0, format_1.valueToNumber)(el.price));
                    if (filterResponse && filterResponse.length) {
                        const subscriptionPrevioResponse = yield subscription_response_1.default.findOne({
                            where: {
                                active: true,
                                userId: subscription.userId,
                                subscriptionId: subscription.id,
                                siteCode: site.code
                            }
                        });
                        if (subscriptionPrevioResponse)
                            yield subscriptionPrevioResponse.update({ active: false });
                        const saveResult = yield subscription_response_1.default.create({
                            index: yield generateSubscriptionsResponseIndex(),
                            userId: subscription.userId,
                            subscriptionId: subscription.id,
                            response: filterResponse,
                            siteCode: site.code
                        });
                        getResultSubscriptions.push(saveResult);
                    }
                }
            }
        }
        return getResultSubscriptions;
    }
    catch (err) {
        logger_1.default.error(`Error for executeFinderSubscription ${functionName}`);
        throw new Error(err);
    }
});
exports.executeFinderSubscription = executeFinderSubscription;
function generateSubscriptionsResponseIndex() {
    return __awaiter(this, void 0, void 0, function* () {
        const functionName = 'generateSubscriptionsIndex';
        try {
            const { count } = yield subscription_response_1.default.findAndCountAll();
            return count + 1;
        }
        catch (err) {
            logger_1.default.error(`Error for generateSubscriptionsIndex ${functionName}`);
            throw new Error(err);
        }
    });
}
const getResultSubscriptions = (telegramId) => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'functions.getResultSubscriptions';
    try {
        const user = yield (0, user_1.getUserByChatId)(telegramId);
        const getResultSubscriptionResponses = yield subscription_response_1.default.findAll({
            where: { active: true, userId: user.id }
        });
        return getResultSubscriptionResponses;
    }
    catch (err) {
        logger_1.default.error(`Error for executeFinderSubscription ${functionName}`);
        throw new Error(err);
    }
});
exports.getResultSubscriptions = getResultSubscriptions;
//# sourceMappingURL=subscription.js.map