import { ProductId } from '../../dom/value-objects/product-id'
import { Optional } from '../../../core/utils/optional'
import { Product } from '../../dom/product'
import { ProductName } from '../../dom/value-objects/product-name'

export interface ProductRepository {
  findOne(id: ProductId): Promise<Optional<Product>>
  findByName(name: ProductName): Promise<Optional<Product>>
  save(product: Product): Promise<void>
}
