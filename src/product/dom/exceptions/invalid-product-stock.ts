import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidProductStockException extends DomainException {
  constructor() {
    super('Invalid product stock')
  }
}
