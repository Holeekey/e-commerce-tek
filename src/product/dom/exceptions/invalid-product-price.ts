import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidProductPriceException extends DomainException {
  constructor() {
    super('Invalid product price')
  }
}
