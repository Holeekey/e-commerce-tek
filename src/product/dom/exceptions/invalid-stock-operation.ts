import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidStockOperationException extends DomainException {
  constructor() {
    super('Invalid stock operation')
  }
}
