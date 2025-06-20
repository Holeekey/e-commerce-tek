import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidUserException extends DomainException {
  constructor() {
    super('Invalid user')
  }
}
