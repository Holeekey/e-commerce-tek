import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidOrderCreationDateException extends DomainException {
  constructor() {
    super('Invalid order creation date')
  }
}
