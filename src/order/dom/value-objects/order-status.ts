import { ValueObject } from '../../../core/dom/value-object/value-object'

export enum OrderStatusEnum {
  PENDING = 'pending',
  SHIPPING = 'shipping',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export class OrderStatus implements ValueObject<OrderStatus> {
  constructor(private readonly _status: OrderStatusEnum) {}

  get value(): string {
    return this._status
  }

  equals(other: OrderStatus): boolean {
    return this._status === other._status
  }
}
