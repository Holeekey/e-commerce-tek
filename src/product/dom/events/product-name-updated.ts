import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { ProductId } from '../value-objects/product-id'
import { ProductName } from '../value-objects/product-name'

export type ProductNameUpdatedEvent = DomainEvent<ProductNameUpdated>

export class ProductNameUpdated {
  private constructor() {}
  name: string

  static createEvent(
    dispatcher: ProductId,
    productName: ProductName
  ): ProductNameUpdatedEvent {
    return DomainEventFactory<ProductNameUpdated>({
      dispatcherId: dispatcher.value,
      name: ProductNameUpdated.name,
      context: {
        name: productName.value,
      },
    })
  }
}
