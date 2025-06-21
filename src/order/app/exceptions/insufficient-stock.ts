import { ApplicationException } from '../../../core/app/exception/application-exception'
import { OrderExceptionCode } from './codes/order-exception-codes'

export class InsufficientStockException extends ApplicationException {
  constructor(productId: string) {
    super(
      OrderExceptionCode.INSUFFICIENT_STOCK,
      `Insufficient stock for product with ID: ${productId}`
    )
  }
}
