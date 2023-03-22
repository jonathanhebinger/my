import { UserId } from './entities'

export type AuthToken = { userId: UserId }
export type AuthJwtPayload = { userId: UserId }
export type AuthSignInDto = {
  email: string
  password: string
}
export type AuthSignedInDto = {
  userId: UserId
  token: string
}
