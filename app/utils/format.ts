import { FormatPhrase } from "../interface/definitionTypes";

export const formatProductMessage = (message: string): FormatPhrase => {
    const phrase : Array<string> = message.split(' ')
    let price: number | null = null
    phrase.shift()
    const formatPhrase = phrase.reduce((acc, el) =>{
        if(parseFloat(el)){
            price = parseFloat(el)
        } else {
            acc = acc + el + ' '
        }
        return acc
    }, '')
    return { formatMessageProduct: formatPhrase.replace(/^\s*|\s*$/g,""), price }
}

export const refactorProductSearch = (phraseProduct: String): string => {
    return (phraseProduct.replace(/ /g, '%20'));
}

export const replaceValueForString = (phraseProduct: string, collection: string) : string => {
    return collection.replace(/VALUE/g, phraseProduct)
}
