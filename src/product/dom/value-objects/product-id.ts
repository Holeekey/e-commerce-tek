import { ValueObject } from '../../../core/dom/value-object/value-object'
import { InvalidProductIdException } from '../exceptions/invalid-product-id'
import { isObjectId } from '../../../core/utils/functions/is-object-id'

export class ProductId implements ValueObject<ProductId> {
  constructor(private readonly _id: string) {
    if (!isObjectId(_id)) throw new InvalidProductIdException()
  }

  get value(): string {
    return this._id
  }

  equals(other: ProductId): boolean {
    return this._id === other._id
  }
}
