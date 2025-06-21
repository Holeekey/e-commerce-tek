import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { OrderId } from '../value-objects/order-id'

export type OrderShippedEvent = DomainEvent<OrderShipped>

export class OrderShipped {
  private constructor() {}

  static createEvent(dispatcher: OrderId): OrderShippedEvent {
    return DomainEventFactory<OrderShipped>({
      dispatcherId: dispatcher.value,
      name: OrderShipped.name,
      context: {},
    })
  }
}
