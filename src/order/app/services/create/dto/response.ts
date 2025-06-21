import { OrderStatusEnum } from '../../../../dom/value-objects/order-status'
export interface CreateOrderResponse {
  status: OrderStatusEnum
  totalPrice: number
}
