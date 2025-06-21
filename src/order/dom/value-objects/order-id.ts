import { ValueObject } from '../../../core/dom/value-object/value-object'
import { isObjectId } from '../../../core/utils/functions/is-object-id'
import { InvalidOrderIdException } from '../exceptions/invalid-order-id'

export class OrderId implements ValueObject<OrderId> {
  constructor(private readonly _id: string) {
    if (!isObjectId(_id)) throw new InvalidOrderIdException()
  }

  get value(): string {
    return this._id
  }

  equals(other: OrderId): boolean {
    return this._id === other._id
  }
}
