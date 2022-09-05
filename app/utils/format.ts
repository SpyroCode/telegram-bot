export const formatProductMessage = (message: string): string => {
    const phrase : Array<string> = message.split(' ')
    phrase.shift()
    const formatPhrase = phrase.reduce((acc, el) =>{
        acc = acc + el + ' '
        return acc
    }, '')
    return formatPhrase.replace(/^\s*|\s*$/g,"")
}
