import { model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cart: {
      type: [
        {
          productId: { type: String, required: true },
          quantity: { type: Number, required: true },
        },
      ],
      required: false,
      default: [],
    },
    orderHistory: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    _id: true,
    timestamps: true,
  }
)

userSchema.index({ email: 1 })

export const UserModel = model('user', userSchema)
