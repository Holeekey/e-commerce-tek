import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidOrderItemQuantityException extends DomainException {
  constructor() {
    super('Invalid order item quantity')
  }
}
