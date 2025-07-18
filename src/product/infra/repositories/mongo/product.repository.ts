import {
  makePaginationResponse,
  Pagination,
  PaginationResponse,
} from '../../../../core/app/pagination/pagination'
import { ProductModel } from '../../../../core/infra/models/product.model'
import { Optional } from '../../../../core/utils/optional'
import { ProductRepository } from '../../../app/repositories/product.repository'
import { makeProduct, Product } from '../../../dom/product'
import { ProductId } from '../../../dom/value-objects/product-id'
import { ProductName } from '../../../dom/value-objects/product-name'
import { StockQuantity } from '../../../dom/value-objects/stock-quantity'

export class MongoProductRepository implements ProductRepository {
  private odmToProduct(odmProduct): Product {
    return makeProduct({
      id: odmProduct._id.toString(),
      name: odmProduct.name,
      stock: odmProduct.stock,
      description: odmProduct.description ?? undefined,
      canStockBeDecimal: odmProduct.canStockBeDecimal,
      price: odmProduct.currentPrice,
      active: odmProduct.active,
    })
  }

  async findOne(id: ProductId): Promise<Optional<Product>> {
    const odmProduct = await ProductModel.findOne({ _id: id.value }).lean()
    if (!odmProduct) return Optional.empty()

    return Optional.of(this.odmToProduct(odmProduct))
  }
  async findByName(name: ProductName): Promise<Optional<Product>> {
    const odmProduct = await ProductModel.findOne({ name: name.value }).lean()
    if (!odmProduct) return Optional.empty()

    return Optional.of(this.odmToProduct(odmProduct))
  }

  async findMany(
    pagination: Pagination,
    filters?: { active?: boolean; minStockQuantity?: StockQuantity }
  ): Promise<PaginationResponse<Product>> {
    const { page, limit } = pagination
    const query: any = {}
    if (filters?.active !== undefined) {
      query.active = filters.active
    }
    if (filters?.minStockQuantity !== undefined) {
      query.stock = { $gte: filters.minStockQuantity.value }
    }
    const skip = (page - 1) * limit

    const odmProducts = await ProductModel.find(query)
      .skip(skip)
      .limit(limit)
      .lean()
    const count = await ProductModel.countDocuments(query)

    const data = odmProducts.map((odmProduct) => this.odmToProduct(odmProduct))

    return makePaginationResponse({
      data,
      page,
      limit,
      count,
    })
  }

  async save(product: Product): Promise<void> {
    await ProductModel.findByIdAndUpdate(
      product.id.value,
      {
        name: product.name.value,
        stock: product.stock.quantity.value,
        description: product.description
          ? product.description.value
          : undefined,
        currentPrice: product.price.value,
        active: product.active,
        canStockBeDecimal: product.stock.isDecimal,
      },
      { upsert: true }
    )
  }
}
