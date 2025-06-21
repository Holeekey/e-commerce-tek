export interface ModifyStockData {
  id: string
  quantity: number
  operation: 'add' | 'subtract'
}
