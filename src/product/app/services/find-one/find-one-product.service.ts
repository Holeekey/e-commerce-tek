import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { FindOneProductResponse } from './dto/response'
import { ProductRepository } from '../../repositories/product.repository'
import { ProductId } from '../../../dom/value-objects/product-id'
import { ProductNotFoundException } from '../../exceptions/not-found'
import { FindOneProductData } from './dto/data'
export class FindOneProductService
  implements ApplicationService<FindOneProductData, FindOneProductResponse>
{
  constructor(private readonly productRepo: ProductRepository) {}

  async execute(
    data: FindOneProductData
  ): Promise<Result<FindOneProductResponse>> {
    const productResult = await this.productRepo.findOne(new ProductId(data.id))

    if (productResult.isEmpty() || !productResult.get().active) {
      return Result.failure(new ProductNotFoundException())
    }

    const product = productResult.get()

    return Result.success({
      id: product.id.value,
      name: product.name.value,
      description: product.description ? product.description.value : undefined,
      stock: product.stock.quantity.value,
      price: product.price.value,
    })
  }
}
