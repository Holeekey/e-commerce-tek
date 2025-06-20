import { AggregateRoot } from '../../core/dom/aggregate/aggregate-root'
import { UserCreated } from './events/user-created'
import { UserNameUpdated } from './events/user-name-updated'
import { InvalidUserException } from './exceptions/invalid-user'
import { UserEmail } from './value-objects/user-email'
import { UserId } from './value-objects/user-id'
import { UserName } from './value-objects/user-name'

export class User extends AggregateRoot<UserId> {
  constructor(id: UserId, private _name: UserName, private _email: UserEmail) {
    super(id)
    this.pushEvent(UserCreated.createEvent(id, _name))
  }

  get name(): UserName {
    return this._name
  }

  get email(): UserEmail {
    return this._email
  }

  updateName(name: UserName) {
    this._name = name
    this.pushEvent(UserNameUpdated.createEvent(this.id, this._name))
  }

  protected validateState(): void {
    if (!this.id || !this._name) {
      throw new InvalidUserException()
    }
  }
}

export const makeUser = (data: {
  id: string
  firstName: string
  lastName: string
  email: string
}) =>
  new User(
    new UserId(data.id),
    new UserName(data.firstName, data.lastName),
    new UserEmail(data.email)
  )
