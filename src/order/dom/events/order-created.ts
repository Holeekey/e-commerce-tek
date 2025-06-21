import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { OrderId } from '../value-objects/order-id'

export type OrderCreatedEvent = DomainEvent<OrderCreated>

export class OrderCreated {
  private constructor() {}

  static createEvent(dispatcher: OrderId): OrderCreatedEvent {
    return DomainEventFactory<OrderCreated>({
      dispatcherId: dispatcher.value,
      name: OrderCreated.name,
      context: {},
    })
  }
}
