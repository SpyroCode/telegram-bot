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
exports.scrapingProduct = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const random_useragent_1 = __importDefault(require("random-useragent"));
const logger_1 = __importDefault(require("../logger"));
const scrapingProduct = (url, productPhrase, configuration) => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'helpers.scrapingProduct';
    try {
        logger_1.default.info(`Started function ${functionName}`);
        const result = [];
        const header = random_useragent_1.default.getRandom();
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.setUserAgent(header);
        yield page.setViewport({ width: 1929, height: 1080 });
        yield page.goto(url);
        yield page.waitForSelector(`${configuration.container}`);
        const itemsList = yield page.$$(`${configuration.section}`);
        for (const item of itemsList) {
            const price = yield item.$(`${configuration.elements.price}`);
            const name = yield item.$(`${configuration.elements.name}`);
            const image = yield item.$(`${configuration.elements.image}`);
            const getPrice = price && (yield page.evaluate(price => price.innerText, price));
            const getName = name && (yield page.evaluate(name => name.innerText, name));
            const getImage = image && (yield page.evaluate(image => image.getAttribute('src'), image));
            result.push({
                name: productPhrase,
                price: getPrice,
                description: getName,
                image: formatImage(getImage),
                url
            });
        }
        yield browser.close();
        return result;
    }
    catch (err) {
        logger_1.default.error(`Error for ${functionName} site ${url}`);
    }
});
exports.scrapingProduct = scrapingProduct;
const formatImage = (image) => {
    if (!image)
        return '';
    image.replace('https:', '');
    return 'https:' + image;
};
//# sourceMappingURL=scraping.js.map