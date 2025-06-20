import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidUserIdException extends DomainException {
  constructor() {
    super('Invalid user ID')
  }
}
