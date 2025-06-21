import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { ProductId } from '../value-objects/product-id'

export type ProductStatusUpdatedEvent = DomainEvent<ProductStatusUpdated>

export class ProductStatusUpdated {
  private constructor() {}
  active: boolean

  static createEvent(
    dispatcher: ProductId,
    isProductActive: boolean
  ): ProductStatusUpdatedEvent {
    return DomainEventFactory<ProductStatusUpdated>({
      dispatcherId: dispatcher.value,
      name: ProductStatusUpdated.name,
      context: {
        active: isProductActive,
      },
    })
  }
}
