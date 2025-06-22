import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { FindOneOrderData } from './dto/data'
import { FindOneOrderResponse } from './dto/response'
import { OrderRepository } from '../../repositories/order.repository'
import { OrderId } from '../../../dom/value-objects/order-id'
import { OrderNotFoundException } from '../../exceptions/not-found'
import { UserId } from '../../../../user/dom/value-objects/user-id'
import { ProductRepository } from '../../../../product/app/repositories/product.repository'

export class FindOneOrderService
  implements ApplicationService<FindOneOrderData, FindOneOrderResponse>
{
  constructor(
    private readonly orderRepo: OrderRepository,
    private productRepo: ProductRepository
  ) {}

  async execute(data: FindOneOrderData): Promise<Result<FindOneOrderResponse>> {
    const orderResult = await this.orderRepo.findOne(new OrderId(data.id))

    if (orderResult.isEmpty()) {
      return Result.failure(new OrderNotFoundException())
    }

    const order = orderResult.get()

    if (!order.userId.equals(new UserId(data.userId)) && data.mustBeOwner) {
      return Result.failure(new OrderNotFoundException())
    }

    return Result.success({
      id: order.id.value,
      userId: order.userId.value,
      status: order.status.value,
      creationDate: order.creationDate.value,
      totalPrice: order.getTotalPrice(),
      items: await Promise.all(
        order.items.map(async (item) => ({
          name: (await this.productRepo.findOne(item.productId)).get().name
            .value,
          productId: item.productId.value,
          quantity: item.quantity.value,
          unitPrice: item.unitPrice.value,
        }))
      ),
    })
  }
}
