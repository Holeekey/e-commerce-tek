export interface CreateProductData {
  name: string
  description?: string
  price: number
  stock: number
  canStockBeDecimal: boolean
}
