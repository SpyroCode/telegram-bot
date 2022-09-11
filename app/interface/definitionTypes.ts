type User = {
    firstName: string,
    lastName: string,
    telegramId: number | null,
    index: number | null
    id: string
}

type FormatPhrase = {
    formatMessageProduct: string,
    price: number | null
}

type ProductResult = {
    name: String,
    price: String,
    description: String,
    image: String
    url: String
}

type Suscription = {
    index: number | null,
    product: string,
    price: number | null,
    date: Date | null
}

type ConfigTelegram = {
    baseURL: string,
    token: string,
    chat_id: string,
    parse_mode: string,
}

export {
    User,
    FormatPhrase,
    ProductResult,
    Suscription,
    ConfigTelegram
}
