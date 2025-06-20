import { UUIDRegex } from '../../../core/utils/uuid-regex'
import { ValueObject } from '../../../core/dom/value-object/value-object'
import { InvalidUserIdException } from '../exceptions/invalid-user-id'

export class UserId implements ValueObject<UserId> {
  constructor(private readonly _id: string) {
    if (!UUIDRegex.test(_id)) throw new InvalidUserIdException()
  }

  get value(): string {
    return this._id
  }

  equals(other: UserId): boolean {
    return this._id === other._id
  }
}
