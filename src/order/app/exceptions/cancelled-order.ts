import { ApplicationException } from '../../../core/app/exception/application-exception'
import { OrderExceptionCode } from './codes/order-exception-codes'

export class CancelledOrderException extends ApplicationException {
  constructor() {
    super(
      OrderExceptionCode.CANCELLED_ORDER,
      'Order already cancelled. Cannot perform this action.'
    )
  }
}
