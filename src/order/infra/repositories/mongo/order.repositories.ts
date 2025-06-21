import {
  Pagination,
  PaginationResponse,
} from '../../../../core/app/pagination/pagination'
import { OrderModel } from '../../../../core/infra/models/order.model'
import { Optional } from '../../../../core/utils/optional'
import { UserId } from '../../../../user/dom/value-objects/user-id'
import { OrderRepository } from '../../../app/repositories/order.repository'
import { Order } from '../../../dom/order'
import { OrderId } from '../../../dom/value-objects/order-id'

export class MongoOrderRepository implements OrderRepository {
  async save(order: Order): Promise<void> {
    await OrderModel.findByIdAndUpdate(
      order.id.value,
      {
        userId: order.userId.value,
        status: order.status.value,
        items: order.items.map((item) => ({
          productId: item.productId.value,
          quantity: item.quantity.value,
          unitPrice: item.unitPrice.value,
        })),
        creationDate: order.creationDate.value,
      },
      { upsert: true }
    )
  }
  findOne(id: OrderId): Promise<Optional<Order>> {
    throw new Error('Method not implemented.')
  }
  findMany(
    pagination: Pagination,
    filters?: { userId: UserId }
  ): Promise<PaginationResponse<Order>> {
    throw new Error('Method not implemented.')
  }
}
