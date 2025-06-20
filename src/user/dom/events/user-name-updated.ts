import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { UserId } from '../value-objects/user-id'
import { UserName } from '../value-objects/user-name'

export type UserNameUpdatedEvent = DomainEvent<UserNameUpdated>

export class UserNameUpdated {
  private constructor() {}
  name: { firstName: string; lastName: string }

  static createEvent(
    dispatcher: UserId,
    userName: UserName
  ): UserNameUpdatedEvent {
    return DomainEventFactory<UserNameUpdated>({
      dispatcherId: dispatcher.value,
      name: UserNameUpdated.name,
      context: {
        name: {
          firstName: userName.firstName,
          lastName: userName.lastName,
        },
      },
    })
  }
}
