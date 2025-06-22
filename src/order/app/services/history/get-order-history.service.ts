import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { GetOrderHistoryData } from './dto/data'
import { GetOrderHistoryResponse } from './dto/response'
import { OrderRepository } from '../../repositories/order.repository'
import { UserId } from '../../../../user/dom/value-objects/user-id'
import { PaginationResponse } from '../../../../core/app/pagination/pagination'
import { ProductRepository } from '../../../../product/app/repositories/product.repository'
export class GetOrderHistoryService
  implements
    ApplicationService<
      GetOrderHistoryData,
      PaginationResponse<GetOrderHistoryResponse>
    >
{
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly productRepo: ProductRepository
  ) {}

  async execute(
    data: GetOrderHistoryData
  ): Promise<Result<PaginationResponse<GetOrderHistoryResponse>>> {
    const orders = await this.orderRepo.findMany(
      {
        page: data.page,
        limit: data.limit,
      },
      { userId: new UserId(data.userId) }
    )

    const response: PaginationResponse<GetOrderHistoryResponse> = {
      ...orders,
      data: await Promise.all(
        orders.data.map(async (order) => ({
          id: order.id.value,
          userId: order.userId.value,
          status: order.status.value,
          creationDate: order.creationDate.value,
          totalPrice: order.getTotalPrice(),
          items: await Promise.all(
            order.items.map(async (item) => ({
              productId: item.productId.value,
              name: (await this.productRepo.findOne(item.productId)).get().name
                .value,
              quantity: item.quantity.value,
              unitPrice: item.unitPrice.value,
            }))
          ),
        }))
      ),
    }

    return Result.success(response)
  }
}
