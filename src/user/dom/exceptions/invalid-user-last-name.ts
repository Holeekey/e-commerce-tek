import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidUserLastNameException extends DomainException {
  constructor() {
    super('Invalid user last name')
  }
}
