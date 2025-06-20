import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidUserFirstNameException extends DomainException {
  constructor() {
    super('Invalid user first name')
  }
}
