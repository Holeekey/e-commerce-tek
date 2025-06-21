import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { UpdateProductData } from './dto/data'
import { UpdateProductResponse } from './dto/response'
import { ProductRepository } from '../../repositories/product.repository'
import { ProductId } from '../../../dom/value-objects/product-id'
import { ProductNotFoundException } from '../../exceptions/not-found'
import { ProductNameExistsException } from '../../exceptions/name-exists'
import { ProductName } from '../../../dom/value-objects/product-name'
import { ProductDescription } from '../../../dom/value-objects/product-description'
import { ProductPrice } from '../../../dom/value-objects/product-price'

export class UpdateProductService
  implements ApplicationService<UpdateProductData, UpdateProductResponse>
{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    data: UpdateProductData
  ): Promise<Result<UpdateProductResponse>> {
    const productResult = await this.productRepository.findOne(
      new ProductId(data.id)
    )

    if (productResult.isEmpty()) {
      return Result.failure(new ProductNotFoundException())
    }

    const product = productResult.get()

    if (data.name) {
      const productByNameResult = await this.productRepository.findByName(
        new ProductName(data.name)
      )

      if (
        productByNameResult.isPresent() &&
        !productByNameResult.get().id.equals(product.id)
      ) {
        return Result.failure(new ProductNameExistsException())
      }

      product.updateName(new ProductName(data.name))
    }

    if (data.description) {
      product.updateDescription(new ProductDescription(data.description))
    }

    if (data.price) {
      product.updatePrice(new ProductPrice(data.price))
    }

    if (data.active !== undefined) {
      product.updateStatus(data.active)
    }

    await this.productRepository.save(product)

    return Result.success({
      message: 'Successful',
    })
  }
}
