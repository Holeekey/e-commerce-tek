import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidProductIdException extends DomainException {
  constructor() {
    super('Invalid product ID')
  }
}
