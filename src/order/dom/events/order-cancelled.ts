import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { OrderId } from '../value-objects/order-id'

export type OrderCancelledEvent = DomainEvent<OrderCancelled>

export class OrderCancelled {
  private constructor() {}

  static createEvent(dispatcher: OrderId): OrderCancelledEvent {
    return DomainEventFactory<OrderCancelled>({
      dispatcherId: dispatcher.value,
      name: OrderCancelled.name,
      context: {},
    })
  }
}
