import { ApplicationException } from '../../../core/app/exception/application-exception'
import { OrderExceptionCode } from './codes/order-exception-codes'

export class DeliveredOrderException extends ApplicationException {
  constructor() {
    super(
      OrderExceptionCode.DELIVERED_ORDER,
      'Order already delivered. Cannot perform this action.'
    )
  }
}
