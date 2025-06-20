import { ValueObject } from '../../../core/dom/value-object/value-object'
import { InvalidProductNameException } from '../exceptions/invalid-product-name'

export class ProductDescription implements ValueObject<ProductDescription> {
  constructor(private readonly _description: string) {
    if (_description.length > 500) throw new InvalidProductNameException()
  }

  get value(): string {
    return this._description
  }

  equals(other: ProductDescription): boolean {
    return this.value === other.value
  }
}
