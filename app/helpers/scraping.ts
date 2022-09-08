import puppeteer from 'puppeteer';
import randomUseragent from 'random-useragent'
import {ProductResult} from "../interface/definitionTypes";
import logger from "../logger";

export const scrapingProduct = async (url: string, productPhrase: string, configuration: any): Promise<any> => {
    const functionName = 'helpers.scrapingProduct'
    try {
        console.log(configuration)
        logger.info(`Started function ${functionName}`)
        const result: Array<ProductResult> = []
        const header = randomUseragent.getRandom()
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setUserAgent(header)
        await page.setViewport({ width: 1929, height: 1080})
        await page.goto(url)
        await page.waitForSelector('.ui-search-results')
        const itemsList =  await page.$$('.ui-search-layout__item')
        for (const item of itemsList){
            const price: any = await item.$('.price-tag-fraction')
            const name: any = await item.$('.ui-search-item__title')
            const image: any = await item.$('.ui-search-result-image__element')
            const getPrice: string = await page.evaluate(price => price.innerText, price)
            const getName: string = await page.evaluate(name => name.innerText, name)
            const getImage: string = await page.evaluate(image => image.getAttribute('src'), image)
            result.push({
                name: productPhrase,
                price: getPrice,
                description: getName,
                image: getImage,
                url
            })
        }
        await browser.close()
        return result
    } catch (err: any) {
        logger.error(`Error for created Bot ${functionName}`)
        throw new Error( err )
    }
}
