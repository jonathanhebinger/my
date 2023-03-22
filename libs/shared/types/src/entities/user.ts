import { Entity, Id } from '../uuid'

export type User = 'user'
export type UserId = Id<User>
export type UserEntity = Entity<User, true> & {
  name: string
  email: string
  password: string
}
