import { model, Schema } from 'mongoose'
import { OrderStatusEnum } from '../../../order/dom/value-objects/order-status'

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatusEnum),
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
    },
    items: {
      type: [
        {
          productId: { type: String, required: true },
          quantity: { type: Number, required: true },
          unitPrice: { type: Number, required: true },
        },
      ],
      required: true,
    },
  },
  {
    _id: true,
  }
)

export const OrderModel = model('order', orderSchema)
