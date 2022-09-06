type User = {
    firstName: string,
    lastName: string,
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

export {
    User,
    FormatPhrase,
    ProductResult,
    Suscription
}
