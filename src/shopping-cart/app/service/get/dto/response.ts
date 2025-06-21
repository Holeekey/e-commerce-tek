export interface GetCartResponse {
  items: {
    productId: string
    quantity: number
  }[]
}
