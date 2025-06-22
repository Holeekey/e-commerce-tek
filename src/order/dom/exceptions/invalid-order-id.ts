import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidOrderIdException extends DomainException {
  constructor() {
    super('Invalid order ID')
  }
}
