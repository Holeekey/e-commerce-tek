import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { ChangeProductStatusData } from './dto/data'
import { ChangeProductStatusResponse } from './dto/response'
import { ProductRepository } from '../../repositories/product.repository'
import { ProductNotFoundException } from '../../exceptions/not-found'
import { ProductId } from '../../../dom/value-objects/product-id'

export class ChangeProductStatusService
  implements
    ApplicationService<ChangeProductStatusData, ChangeProductStatusResponse>
{
  constructor(private readonly productRepo: ProductRepository) {}

  async execute(
    data: ChangeProductStatusData
  ): Promise<Result<ChangeProductStatusResponse>> {
    const productResult = await this.productRepo.findOne(new ProductId(data.id))

    if (productResult.isEmpty()) {
      return Result.failure(new ProductNotFoundException())
    }

    const product = productResult.get()
    product.updateStatus(data.active)

    await this.productRepo.save(product)

    return Result.success({
      message: 'Succesful',
    })
  }
}
