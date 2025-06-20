import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { ProductId } from '../value-objects/product-id'
import { ProductPrice } from '../value-objects/product-price'

export type ProductPriceUpdatedEvent = DomainEvent<ProductPriceUpdated>

export class ProductPriceUpdated {
  private constructor() {}
  price: number

  static createEvent(
    dispatcher: ProductId,
    productPrice: ProductPrice
  ): ProductPriceUpdatedEvent {
    return DomainEventFactory<ProductPriceUpdated>({
      dispatcherId: dispatcher.value,
      name: ProductPriceUpdated.name,
      context: {
        price: productPrice.value,
      },
    })
  }
}
