import {
  Pagination,
  PaginationResponse,
} from '../../../src/core/app/pagination/pagination'
import { Optional } from '../../../src/core/utils/optional'
import { OrderRepository } from '../../../src/order/app/repositories/order.repository'
import { Order } from '../../../src/order/dom/order'
import { OrderId } from '../../../src/order/dom/value-objects/order-id'
import { UserId } from '../../../src/user/dom/value-objects/user-id'

export class MockOrderRepository implements OrderRepository {
  private orders: Order[] = []

  constructor(orders: Order[] = []) {
    this.orders = orders
  }

  async save(order: Order): Promise<void> {
    const existingIndex = this.orders.findIndex((o) => o.id.equals(order.id))
    if (existingIndex !== -1) {
      this.orders[existingIndex] = order
    } else {
      this.orders.push(order)
    }
  }
  async findOne(id: OrderId): Promise<Optional<Order>> {
    const order = this.orders.find((o) => o.id.equals(id))
    return order ? Optional.of(order) : Optional.empty()
  }
  findMany(
    pagination: Pagination,
    filters?: { userId: UserId }
  ): Promise<PaginationResponse<Order>> {
    throw new Error('Method not implemented.')
  }
  findManyByUserId(
    pagination: Pagination,
    userId: UserId
  ): Promise<PaginationResponse<Order>> {
    throw new Error('Method not implemented.')
  }
}
