import {
  Pagination,
  PaginationResponse,
} from '../../../core/app/pagination/pagination'
import { Optional } from '../../../core/utils/optional'
import { UserId } from '../../../user/dom/value-objects/user-id'
import { Order } from '../../dom/order'
import { OrderId } from '../../dom/value-objects/order-id'

export interface OrderRepository {
  save(order: Order): Promise<void>
  findOne(id: OrderId): Promise<Optional<Order>>
  findMany(
    pagination: Pagination,
    filters?: { userId: UserId }
  ): Promise<PaginationResponse<Order>>
  findManyByUserId(
    pagination: Pagination,
    userId: UserId
  ): Promise<PaginationResponse<Order>>
}
