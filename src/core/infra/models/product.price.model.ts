import { model, Schema } from 'mongoose'

const productPricesSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startedAt: {
    type: Date,
    required: true,
  },
  finishedAt: {
    type: Date,
    required: false,
  },
})

export const ProductPriceModel = model('product_prices', productPricesSchema)
