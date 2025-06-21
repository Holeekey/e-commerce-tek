import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidOrderDeliveryException extends DomainException {
  constructor() {
    super('Order must be in shipping status to be delivered')
  }
}
