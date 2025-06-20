import { model, Schema } from 'mongoose'
import { Role } from '../../../auth/app/models/credentials'

const credentialsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
      default: Role.CLIENT,
    },
  },
  {
    _id: true,
    timestamps: true,
  }
)

credentialsSchema.index({ id: 1, email: 1 })

export const CredentialsModel = model('credentials', credentialsSchema)
