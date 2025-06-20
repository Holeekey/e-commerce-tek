import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { UserId } from '../value-objects/user-id'
import { UserName } from '../value-objects/user-name'

export type UserCreatedEvent = DomainEvent<UserCreated>

export class UserCreated {
  private constructor() {}
  name: { firstName: string; lastName: string }

  static createEvent(dispatcher: UserId, userName: UserName): UserCreatedEvent {
    return DomainEventFactory<UserCreated>({
      dispatcherId: dispatcher.value,
      name: UserCreated.name,
      context: {
        name: {
          firstName: userName.firstName,
          lastName: userName.lastName,
        },
      },
    })
  }
}
