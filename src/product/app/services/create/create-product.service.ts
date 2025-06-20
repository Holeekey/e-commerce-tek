import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { CreateProductDTO } from '../../../infra/dto/create-product.dto'
import { CreateProductResponse } from './dto/response'
import { IdGenerator } from '../../../../core/app/id-generator/id-generator.interfaces'
export class CreateProductService
  implements ApplicationService<CreateProductDTO, CreateProductResponse>
{
  constructor(private readonly idGenerator: IdGenerator<string>) {}

  async execute(
    data: CreateProductDTO
  ): Promise<Result<CreateProductResponse>> {
    const productId = this.idGenerator.generate()

    return Result.success({
      id: productId,
    })
  }
}
