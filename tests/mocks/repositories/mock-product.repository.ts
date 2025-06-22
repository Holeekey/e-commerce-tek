import {
  Pagination,
  PaginationResponse,
} from '../../../src/core/app/pagination/pagination'
import { Optional } from '../../../src/core/utils/optional'
import { ProductRepository } from '../../../src/product/app/repositories/product.repository'
import { Product } from '../../../src/product/dom/product'
import { ProductId } from '../../../src/product/dom/value-objects/product-id'
import { ProductName } from '../../../src/product/dom/value-objects/product-name'
import { StockQuantity } from '../../../src/product/dom/value-objects/stock-quantity'

export class MockProductRepository implements ProductRepository {
  product: Product[]

  constructor(products: Product[] = []) {
    this.product = products
  }

  findOne(id: ProductId): Promise<Optional<Product>> {
    const foundProduct = this.product.find((p) => p.id.equals(id))
    if (foundProduct) {
      return Promise.resolve(Optional.of(foundProduct))
    }
    return Promise.resolve(Optional.empty())
  }
  findByName(name: ProductName): Promise<Optional<Product>> {
    const foundProduct = this.product.find((p) => p.name.equals(name))
    if (foundProduct) {
      return Promise.resolve(Optional.of(foundProduct))
    }
    return Promise.resolve(Optional.empty())
  }
  findMany(
    pagination: Pagination,
    filters?: { active?: boolean; minStockQuantity?: StockQuantity }
  ): Promise<PaginationResponse<Product>> {
    throw new Error('Method not implemented.')
  }
  save(product: Product): Promise<void> {
    const existingIndex = this.product.findIndex((p) => p.id.equals(product.id))
    if (existingIndex !== -1) {
      this.product[existingIndex] = product
    } else {
      this.product.push(product)
    }
    return Promise.resolve()
  }
}
