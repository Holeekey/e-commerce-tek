import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidOrderException extends DomainException {
  constructor() {
    super('Invalid order')
  }
}
