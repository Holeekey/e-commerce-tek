import { ValueObject } from '../../../core/dom/value-object/value-object'
import { InvalidUserEmailException } from '../exceptions/invalid-user-email'

export class UserEmail implements ValueObject<UserEmail> {
  constructor(private readonly _email: string) {
    if (!UserEmail.isValid(_email)) throw new InvalidUserEmailException()
  }

  get value(): string {
    return this._email
  }

  equals(other: UserEmail): boolean {
    return this._email === other._email
  }

  private static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
