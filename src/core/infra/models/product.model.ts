import { model, Schema } from 'mongoose'

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    canStockBeDecimal: {
      type: Boolean,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    _id: true,
    timestamps: true,
  }
)

productSchema.index({ id: 1 })

export const ProductModel = model('product', productSchema)
