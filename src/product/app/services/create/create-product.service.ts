import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { CreateProductDTO } from '../../../infra/dto/create-product.dto'
import { CreateProductResponse } from './dto/response'
import { IdGenerator } from '../../../../core/app/id-generator/id-generator.interfaces'
import { ProductRepository } from '../../repositories/product.repository'
import { ProductName } from '../../../dom/value-objects/product-name'
import { ProductNameExistsException } from '../../exceptions/name-exists'
import { makeProduct } from '../../../dom/product'
import { getDecimalsQuantity } from '../../../../core/utils/functions/get-decimals-quantity'
import { DecimalStockException } from '../../exceptions/decimal_stock'
export class CreateProductService
  implements ApplicationService<CreateProductDTO, CreateProductResponse>
{
  constructor(
    private readonly idGenerator: IdGenerator<string>,
    private productRepo: ProductRepository
  ) {}

  async execute(
    data: CreateProductDTO
  ): Promise<Result<CreateProductResponse>> {
    const existingProduct = await this.productRepo.findByName(
      new ProductName(data.name)
    )

    if (existingProduct.isPresent()) {
      return Result.failure(new ProductNameExistsException())
    }

    const isStockQuantityDecimal = getDecimalsQuantity(data.stock) > 0
    if (!data.canStockBeDecimal && isStockQuantityDecimal) {
      return Result.failure(new DecimalStockException())
    }

    const productId = this.idGenerator.generate()

    const product = makeProduct({
      id: productId,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      canStockBeDecimal: data.canStockBeDecimal,
    })

    await this.productRepo.save(product)

    return Result.success({
      id: productId,
    })
  }
}
