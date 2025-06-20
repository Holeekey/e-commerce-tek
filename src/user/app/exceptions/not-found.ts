import { ApplicationException } from '../../../core/app/exception/application-exception'
import { UserExceptionCode } from './codes/user-exception-codes'

export class UserNotFoundException extends ApplicationException {
  constructor() {
    super(UserExceptionCode.NOT_FOUND, 'User not found')
  }
}
