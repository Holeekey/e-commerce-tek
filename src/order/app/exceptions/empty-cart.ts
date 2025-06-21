import { ApplicationException } from '../../../core/app/exception/application-exception'
import { OrderExceptionCode } from './codes/order-exception-codes'

export class EmptyCartException extends ApplicationException {
  constructor() {
    super(
      OrderExceptionCode.EMPTY_CART,
      'The cart is empty. Please add items to the cart before placing an order.'
    )
  }
}
