import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidOrderShipException extends DomainException {
  constructor() {
    super('Order must be pending to ship')
  }
}
