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
  },
  {
    _id: true,
    timestamps: true,
  }
)

userSchema.index({ email: 1 })

export const UserModel = model('user', userSchema)
