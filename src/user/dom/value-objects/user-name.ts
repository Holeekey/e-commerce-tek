import { ValueObject } from '../../../core/dom/value-object/value-object'
import { InvalidUserFirstNameException } from '../exceptions/invalid-user-first-name'
import { InvalidUserLastNameException } from '../exceptions/invalid-user-last-name'

export class UserName implements ValueObject<UserName> {
  constructor(
    private readonly _firstName: string,
    private readonly _lastName: string
  ) {
    if (_firstName.length < 2 || _firstName.length > 50)
      throw new InvalidUserFirstNameException()
    if (_lastName.length < 2 || _lastName.length > 50)
      throw new InvalidUserLastNameException()
  }

  get firstName(): string {
    return this._firstName
  }

  get lastName(): string {
    return this._lastName
  }

  equals(other: UserName): boolean {
    return (
      this.firstName === other.firstName && this.lastName === other.lastName
    )
  }
}
