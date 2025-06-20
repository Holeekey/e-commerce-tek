import { AuthExceptionCode } from './codes/auth-exception-codes'
import { ApplicationException } from '../../../core/app/exception/application-exception'

export class InvalidEmailException extends ApplicationException {
  constructor() {
    super(
      AuthExceptionCode.INVALID_EMAIL,
      'No user with that email registrated',
      null
    )
  }
}
