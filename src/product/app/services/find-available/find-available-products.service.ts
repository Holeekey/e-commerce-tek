import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { FindAvailableProductData } from './dto/data'
import { FindAvailableProductResponse } from './dto/response'
import { ProductRepository } from '../../repositories/product.repository'
import { PaginationResponse } from '../../../../core/app/pagination/pagination'
import { StockQuantity } from '../../../dom/value-objects/stock-quantity'

export class FindAvailableProductsService
  implements
    ApplicationService<
      FindAvailableProductData,
      PaginationResponse<FindAvailableProductResponse>
    >
{
  constructor(private readonly productRepo: ProductRepository) {}

  async execute(
    data: FindAvailableProductData
  ): Promise<Result<PaginationResponse<FindAvailableProductResponse>>> {
    const productsReponse = await this.productRepo.findMany(data, {
      active: true,
      minStockQuantity: new StockQuantity(0.0001),
    })

    const response: PaginationResponse<FindAvailableProductResponse> = {
      ...productsReponse,
      data: productsReponse.data.map((product) => ({
        id: product.id.value,
        name: product.name.value,
        description: product.description
          ? product.description.value
          : undefined,
        stock: product.stock.quantity.value,
        price: product.price.value,
      })),
    }

    return Result.success(response)
  }
}
