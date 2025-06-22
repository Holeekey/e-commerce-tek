import { AggregateRoot } from '../../core/dom/aggregate/aggregate-root'
import { OrderCreated } from './events/order-created'
import { OrderId } from './value-objects/order-id'
import { InvalidOrderException } from './exceptions/invalid-order'
import { OrderStatus, OrderStatusEnum } from './value-objects/order-status'
import { UserId } from '../../user/dom/value-objects/user-id'
import { OrderItem } from './value-objects/order-item'
import { OrderCancelled } from './events/order-cancelled'
import { InvalidOrderCancelException } from './exceptions/invalid-order-cancel'
import { InvalidOrderShipException } from './exceptions/invalid-order-ship'
import { OrderShipped } from './events/order-shipped'
import { InvalidOrderDeliveryException } from './exceptions/invalid-order-delivery'
import { OrderDelivered } from './events/order-delivered'
import { OrderCreationDate } from './value-objects/order-creation-date'
import { ProductId } from '../../product/dom/value-objects/product-id'
import { OrderItemQuantity } from './value-objects/order-item-quantity'
import { OrderItemUnitPrice } from './value-objects/order-item-price'

export class Order extends AggregateRoot<OrderId> {
  constructor(
    id: OrderId,
    private _status: OrderStatus,
    private _userId: UserId,
    private _items: OrderItem[] = [],
    private _creationDate: OrderCreationDate
  ) {
    super(id)
    this.pushEvent(OrderCreated.createEvent(id, _userId, _items))
  }

  get status(): OrderStatus {
    return this._status
  }

  get userId(): UserId {
    return this._userId
  }

  get items(): OrderItem[] {
    return this._items
  }

  get creationDate(): OrderCreationDate {
    return this._creationDate
  }

  get isPending(): boolean {
    return this._status.value === OrderStatusEnum.PENDING
  }

  get isShipping(): boolean {
    return this._status.value === OrderStatusEnum.SHIPPING
  }

  get isDelivered(): boolean {
    return this._status.value === OrderStatusEnum.DELIVERED
  }

  get isCancelled(): boolean {
    return this._status.value === OrderStatusEnum.CANCELLED
  }

  addItem(item: OrderItem): void {
    this._items.push(item)
  }

  getTotalPrice(): number {
    return this._items.reduce((total, item) => {
      return total + item.quantity.value * item.unitPrice.value
    }, 0)
  }

  cancel(): void {
    if (!this.isPending) {
      throw new InvalidOrderCancelException()
    }
    this._status = new OrderStatus(OrderStatusEnum.CANCELLED)
    this.pushEvent(OrderCancelled.createEvent(this.id))
  }

  ship(): void {
    if (!this.isPending) {
      throw new InvalidOrderShipException()
    }
    this._status = new OrderStatus(OrderStatusEnum.SHIPPING)
    this.pushEvent(OrderShipped.createEvent(this.id))
  }

  deliver(): void {
    if (!this.isShipping) {
      throw new InvalidOrderDeliveryException()
    }
    this._status = new OrderStatus(OrderStatusEnum.DELIVERED)
    this.pushEvent(OrderDelivered.createEvent(this.id))
  }

  protected validateState(): void {
    if (!this.id) {
      throw new InvalidOrderException()
    }
  }
}

export const makeOrder = (data: {
  id: string
  status?: OrderStatusEnum
  userId: string
  items: {
    productId: string
    quantity: number
    unitPrice: number
  }[]
  creationDate?: Date
}) =>
  new Order(
    new OrderId(data.id),
    new OrderStatus(data.status ?? OrderStatusEnum.PENDING),
    new UserId(data.userId),
    data.items.map(
      (item) =>
        new OrderItem(
          new ProductId(item.productId),
          new OrderItemQuantity(item.quantity),
          new OrderItemUnitPrice(item.unitPrice)
        )
    ),
    new OrderCreationDate(data.creationDate ?? new Date())
  )
