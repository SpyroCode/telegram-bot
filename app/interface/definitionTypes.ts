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

export {
    User,
    FormatPhrase,
    ProductResult
}
