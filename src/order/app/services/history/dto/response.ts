import { OrderStatusEnum } from '../../../../dom/value-objects/order-status'

export interface GetOrderHistoryResponse {
  id: string
  userId: string
  status: OrderStatusEnum
  creationDate: Date
  totalPrice: number
  items: {
    productId: string
    name: string
    quantity: number
    unitPrice: number
  }[]
}
