import { ValueObject } from '../../../core/dom/value-object/value-object'
import { InvalidOrderCreationDateException } from '../exceptions/invalid-order-creation-date'

export class OrderCreationDate implements ValueObject<OrderCreationDate> {
  constructor(private readonly _date: Date) {
    if (this._date.getTime() > Date.now()) {
      throw new InvalidOrderCreationDateException()
    }
  }

  get value(): Date {
    return this._date
  }

  equals(other: OrderCreationDate): boolean {
    return this.value.getTime() === other.value.getTime()
  }
}
