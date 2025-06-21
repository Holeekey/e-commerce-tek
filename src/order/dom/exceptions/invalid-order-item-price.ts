import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidOrderItemPriceException extends DomainException {
  constructor() {
    super('Invalid order item price')
  }
}
