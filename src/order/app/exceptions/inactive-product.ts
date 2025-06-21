import { ApplicationException } from '../../../core/app/exception/application-exception'
import { OrderExceptionCode } from './codes/order-exception-codes'

export class InactiveProductException extends ApplicationException {
  constructor(productId: string) {
    super(
      OrderExceptionCode.INACTIVE_PRODUCT,
      `Product with ID: ${productId} is inactive and cannot be ordered`
    )
  }
}
