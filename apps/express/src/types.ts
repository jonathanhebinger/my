import { AuthJwtPayload, UserEntity } from '@my/shared/types'
import { NextFunction, Request, Response } from 'express'

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void

declare module 'express' {
  interface Request {
    getAuth(): AuthJwtPayload
    auth?: AuthJwtPayload
    getUser(): Promise<UserEntity>
    user?: UserEntity | null
  }
}
