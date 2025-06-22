import { ApplicationException } from '../../../core/app/exception/application-exception'
import { OrderExceptionCode } from './codes/order-exception-codes'

export class NotPendingOrderException extends ApplicationException {
  constructor() {
    super(
      OrderExceptionCode.NOT_PENDING_ORDER,
      'Order is not pending. Cannot perform this action.'
    )
  }
}
