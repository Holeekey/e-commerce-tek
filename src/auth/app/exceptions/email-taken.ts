import { ApplicationException } from '../../../core/app/exception/application-exception'
import { AuthExceptionCode } from './codes/auth-exception-codes'

export class EmailTakenException extends ApplicationException {
  constructor() {
    super(AuthExceptionCode.EMAIL_TAKEN, 'Email already taken')
  }
}
