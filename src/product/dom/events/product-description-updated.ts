import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { ProductDescription } from '../value-objects/product-description'
import { ProductId } from '../value-objects/product-id'

export type ProductDescriptionUpdatedEvent =
  DomainEvent<ProductDescriptionUpdated>

export class ProductDescriptionUpdated {
  private constructor() {}
  description: string

  static createEvent(
    dispatcher: ProductId,
    productDescription: ProductDescription
  ): ProductDescriptionUpdatedEvent {
    return DomainEventFactory<ProductDescriptionUpdated>({
      dispatcherId: dispatcher.value,
      name: ProductDescriptionUpdated.name,
      context: {
        description: productDescription.value,
      },
    })
  }
}
