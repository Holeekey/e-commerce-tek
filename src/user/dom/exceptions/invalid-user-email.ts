import { DomainException } from '../../../core/dom/exception/domain-exception'

export class InvalidUserEmailException extends DomainException {
  constructor() {
    super('Invalid user email')
  }
}
