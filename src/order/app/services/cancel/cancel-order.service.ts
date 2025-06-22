import { ApplicationService } from '../../../../core/app/service/application-service.interface'
import { Result } from '../../../../core/utils/result'
import { CancelOrderData } from './dto/data'
import { CancelOrderResponse } from './dto/response'
import { OrderRepository } from '../../repositories/order.repository'
import { OrderId } from '../../../dom/value-objects/order-id'
import { OrderNotFoundException } from '../../exceptions/not-found'
import { UserId } from '../../../../user/dom/value-objects/user-id'
import { NotPendingOrderException } from '../../exceptions/not-pending'

export class CancelOrderService
  implements ApplicationService<CancelOrderData, CancelOrderResponse>
{
  constructor(private readonly orderRepo: OrderRepository) {}

  async execute(data: CancelOrderData): Promise<Result<CancelOrderResponse>> {
    const orderResult = await this.orderRepo.findOne(new OrderId(data.id))

    if (orderResult.isEmpty()) {
      return Result.failure(new OrderNotFoundException())
    }

    const order = orderResult.get()

    if (!order.userId.equals(new UserId(data.userId)) && data.mustBeOwner) {
      return Result.failure(new OrderNotFoundException())
    }

    if (!order.isPending) {
      return Result.failure(new NotPendingOrderException())
    }

    order.cancel()

    await this.orderRepo.save(order)

    return Result.success({
      message: 'Successful',
    })
  }
}
