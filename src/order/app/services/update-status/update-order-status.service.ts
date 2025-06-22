import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { UpdateOrderStatusData } from './dto/data'
import { UpdateOrderStatusResponse } from './dto/response'
import { OrderRepository } from '../../repositories/order.repository'
import { OrderId } from '../../../dom/value-objects/order-id'
import { OrderNotFoundException } from '../../exceptions/not-found'
import { DeliveredOrderException } from '../../exceptions/delivered-order'
import { CancelledOrderException } from '../../exceptions/cancelled-order'

export class UpdateOrderStatusService
  implements
    ApplicationService<UpdateOrderStatusData, UpdateOrderStatusResponse>
{
  constructor(private readonly orderRepo: OrderRepository) {}

  async execute(
    data: UpdateOrderStatusData
  ): Promise<Result<UpdateOrderStatusResponse>> {
    const orderResult = await this.orderRepo.findOne(new OrderId(data.id))

    if (orderResult.isEmpty()) {
      return Result.failure(new OrderNotFoundException())
    }

    const order = orderResult.get()

    if (order.isPending) {
      order.ship()
    } else if (order.isShipping) {
      order.deliver()
    } else if (order.isDelivered) {
      return Result.failure(new DeliveredOrderException())
    } else {
      return Result.failure(new CancelledOrderException())
    }

    await this.orderRepo.save(order)

    return Result.success({
      message: 'Successful',
    })
  }
}
