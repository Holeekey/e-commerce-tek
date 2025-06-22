import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { UserId } from '../../../user/dom/value-objects/user-id'
import { OrderId } from '../value-objects/order-id'
import { OrderItem } from '../value-objects/order-item'

export type OrderCreatedEvent = DomainEvent<OrderCreated>

export class OrderCreated {
  private constructor() {}

  userId: string
  items: {
    productId: string
    quantity: number
    unitPrice: number
  }[]

  static createEvent(
    dispatcher: OrderId,
    userId: UserId,
    items: OrderItem[]
  ): OrderCreatedEvent {
    return DomainEventFactory<OrderCreated>({
      dispatcherId: dispatcher.value,
      name: OrderCreated.name,
      context: {
        userId: userId.value,
        items: items.map((item) => ({
          productId: item.productId.value,
          quantity: item.quantity.value,
          unitPrice: item.unitPrice.value,
        })),
      },
    })
  }
}
