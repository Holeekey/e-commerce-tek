import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { OrderId } from '../value-objects/order-id'

export type OrderDeliveredEvent = DomainEvent<OrderDelivered>

export class OrderDelivered {
  private constructor() {}

  static createEvent(dispatcher: OrderId): OrderDeliveredEvent {
    return DomainEventFactory<OrderDelivered>({
      dispatcherId: dispatcher.value,
      name: OrderDelivered.name,
      context: {},
    })
  }
}
