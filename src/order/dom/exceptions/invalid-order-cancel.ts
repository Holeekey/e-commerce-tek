import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidOrderCancelException extends DomainException {
  constructor() {
    super('Invalid order ID')
  }
}
