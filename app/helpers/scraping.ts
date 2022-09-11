import puppeteer from 'puppeteer';
import randomUseragent from 'random-useragent'
import {ProductResult} from "../interface/definitionTypes";
import logger from "../logger";

export const scrapingProduct = async (url: string, productPhrase: string, configuration: any): Promise<any> => {
    const functionName = 'helpers.scrapingProduct'
    try {
        logger.info(`Started function ${functionName}`)
        const result: Array<ProductResult> = []
        const header = randomUseragent.getRandom()
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setUserAgent(header)
        await page.setViewport({ width: 1929, height: 1080})
        await page.goto(url)
        await page.waitForSelector(`${configuration.container}`)
        const itemsList =  await page.$$(`${configuration.section}`)
        for (const item of itemsList){
            const price: any = await item.$(`${configuration.elements.price}`)
            const name: any = await item.$(`${configuration.elements.name}`)
            const image: any = await item.$(`${configuration.elements.image}`)
            const getPrice: string = price && await page.evaluate(price => price.innerText, price)
            const getName: string = name && await page.evaluate(name => name.innerText, name)
            const getImage: string = image && await page.evaluate(image => image.getAttribute('src'), image)
            result.push({
                name: productPhrase,
                price: getPrice,
                description: getName,
                image: formatImage(getImage),
                url
            })
        }

        await browser.close()
        return result
    } catch (err: any) {
        logger.error(`Error for ${functionName} site ${url}`)
    }
}


const formatImage = (image: string):string => {
    if(!image) return ''
    image.replace('https:', '')
    return 'https:' + image
}
