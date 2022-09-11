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

export const valueToNumber = (value: any): number => {
    if(!value) return 0
    const specialChars = '!@#$^&%*()+=-[]{}|:<>?,'
    for (let i = 0; i < specialChars.length; i++) {
        value = value && value.replace(new RegExp('\\' + specialChars[i], 'gi'), '')
    }
    value = value.replace(/USD/g,'')
    value = value.replace(/á/gi, 'a')
    value = value.replace(/é/gi, 'e')
    value = value.replace(/í/gi, 'i')
    value = value.replace(/ó/gi, 'o')
    value = value.replace(/ú/gi, 'u')
    value = value.replace(/ñ/gi, 'n')
    value = value.replace(/ü/gi, 'u')
    value = value.replace(/Á/gi, 'A')
    value = value.replace(/É/gi, 'E')
    value = value.replace(/Í/gi, 'I')
    value = value.replace(/Ú/gi, 'U')
    value = value.replace(/Ü/gi, 'U')
    value = value.replace(/Ñ/gi, 'N')
    value = parseFloat(value)
    return value || 0
}

export const formatMoney = (value: number):string =>{
    const price: string = '$'+  Intl.NumberFormat("en-MX",{
        minimumFractionDigits: 2
    }).format(value);
    return price
}
