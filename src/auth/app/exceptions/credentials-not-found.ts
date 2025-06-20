import { AuthExceptionCode } from './codes/auth-exception-codes'
import { ApplicationException } from '../../../core/app/exception/application-exception'

export class CredentialsNotFoundException extends ApplicationException {
  constructor() {
    super(AuthExceptionCode.NOT_FOUND, 'Credentials not found')
  }
}
