import { ApplicationException } from '../../../core/app/exception/application-exception'
import { OrderExceptionCode } from './codes/order-exception-codes'

export class OrderNotFoundException extends ApplicationException {
  constructor() {
    super(OrderExceptionCode.NOT_FOUND, 'Order not found')
  }
}
