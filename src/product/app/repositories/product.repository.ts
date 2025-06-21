import { ProductId } from '../../dom/value-objects/product-id'
import { Optional } from '../../../core/utils/optional'
import { Product } from '../../dom/product'
import { ProductName } from '../../dom/value-objects/product-name'
import {
  Pagination,
  PaginationResponse,
} from '../../../core/app/pagination/pagination'
import { StockQuantity } from '../../dom/value-objects/stock-quantity'

export interface ProductRepository {
  findOne(id: ProductId): Promise<Optional<Product>>
  findByName(name: ProductName): Promise<Optional<Product>>
  findMany(
    pagination: Pagination,
    filters?: { active?: boolean; minStockQuantity?: StockQuantity }
  ): Promise<PaginationResponse<Product>>
  save(product: Product): Promise<void>
}
