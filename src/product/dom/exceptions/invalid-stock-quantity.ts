import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidStockQuantityException extends DomainException {
  constructor() {
    super('Invalid stock quantity')
  }
}
