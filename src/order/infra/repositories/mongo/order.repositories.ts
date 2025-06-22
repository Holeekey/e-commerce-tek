import {
  makePaginationResponse,
  Pagination,
  PaginationResponse,
} from '../../../../core/app/pagination/pagination'
import { OrderModel } from '../../../../core/infra/models/order.model'
import { Optional } from '../../../../core/utils/optional'
import { UserId } from '../../../../user/dom/value-objects/user-id'
import { OrderRepository } from '../../../app/repositories/order.repository'
import { makeOrder, Order } from '../../../dom/order'
import { OrderId } from '../../../dom/value-objects/order-id'

export class MongoOrderRepository implements OrderRepository {
  private odmToOrder(odmOrder): Order {
    return makeOrder({
      id: odmOrder._id.toString(),
      userId: odmOrder.userId,
      status: odmOrder.status,
      items: odmOrder.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      creationDate: odmOrder.creationDate,
    })
  }

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
  async findOne(id: OrderId): Promise<Optional<Order>> {
    const odmOrder = await OrderModel.findOne({ _id: id.value }).lean()
    if (!odmOrder) {
      return Optional.empty()
    }
    return Optional.of(this.odmToOrder(odmOrder))
  }
  async findMany(
    pagination: Pagination,
    filters?: { userId: UserId }
  ): Promise<PaginationResponse<Order>> {
    const { page, limit } = pagination
    const query: any = {}
    if (filters?.userId) {
      query.userId = filters.userId.value
    }
    const skip = (page - 1) * limit

    const odmOrders = await OrderModel.find(query)
      .sort({ creationDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const count = await OrderModel.countDocuments(query)

    const data = odmOrders.map((odmOrder) => this.odmToOrder(odmOrder))

    return makePaginationResponse({
      data,
      page,
      limit,
      count,
    })
  }
}
