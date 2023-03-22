import { AuthJwtPayload } from '@my/shared/types'
import { Express, Request } from 'express'
import jwt from 'jsonwebtoken'

export default function getAuthExtension(app: Express) {
  Object.defineProperty(app.request, 'getAuth', {
    configurable: false,
    enumerable: true,
    value(this: Request) {
      if (!this.auth) {
        try {
          const token = this.headers.authorization?.split(' ')[1]

          if (!token) throw new Error()

          const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')

          this.auth = decodedToken as AuthJwtPayload

          return this.auth
        } catch (err) {
          throw new Error('Not authentified')
        }
      }
    },
  })
}
