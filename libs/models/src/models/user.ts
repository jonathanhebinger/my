import { UserEntity } from '@my/shared/types'
import { model, Schema } from 'mongoose'

export const USER = 'user'

export const userSchema = new Schema<UserEntity>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
)
export const UserModel = model(USER, userSchema)
