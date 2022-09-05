type formatPhrase = {
    formatMessageProduct: string,
    price: number | null
}

export const formatProductMessage = (message: string): formatPhrase => {
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
