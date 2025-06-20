import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidProductNameException extends DomainException {
  constructor() {
    super('Invalid product name')
  }
}
