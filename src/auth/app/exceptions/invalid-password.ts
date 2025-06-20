import { ApplicationException } from '../../../core/app/exception/application-exception'
import { AuthExceptionCode } from './codes/auth-exception-codes'

export class InvalidPasswordException extends ApplicationException {
  constructor() {
    super(AuthExceptionCode.INVALID_PASSWORD, 'Password does not match')
  }
}
