import {
  DomainEvent,
  DomainEventFactory,
} from '../../../core/dom/event/domain-event'
import { ProductId } from '../value-objects/product-id'
import { ProductName } from '../value-objects/product-name'
import { ProductPrice } from '../value-objects/product-price'

export type ProductCreatedEvent = DomainEvent<ProductCreated>

export class ProductCreated {
  private constructor() {}
  name: string
  price: number

  static createEvent(
    dispatcher: ProductId,
    productName: ProductName,
    productPrice: ProductPrice
  ): ProductCreatedEvent {
    return DomainEventFactory<ProductCreated>({
      dispatcherId: dispatcher.value,
      name: ProductCreated.name,
      context: {
        name: productName.value,
        price: productPrice.value,
      },
    })
  }
}
