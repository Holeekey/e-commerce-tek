export type ShoppingCartItem = {
  productId: string
  quantity: number
}

export type ShoppingCart = {
  userId: string
  items: ShoppingCartItem[]
}
