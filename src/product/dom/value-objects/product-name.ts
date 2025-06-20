import { ValueObject } from '../../../core/dom/value-object/value-object'
import { InvalidProductNameException } from '../exceptions/invalid-product-name'

export class ProductName implements ValueObject<ProductName> {
  constructor(private readonly _name: string) {
    if (_name.length < 3 || _name.length > 100)
      throw new InvalidProductNameException()
  }

  get value(): string {
    return this._name
  }

  equals(other: ProductName): boolean {
    return this.value === other.value
  }
}
