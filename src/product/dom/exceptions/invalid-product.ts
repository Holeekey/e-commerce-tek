import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidProductException extends DomainException {
  constructor() {
    super('Invalid product')
  }
}
