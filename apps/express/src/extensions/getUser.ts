import { UserDao } from '@my/models'
import { Express, Request } from 'express'

export default function getUserExtension(app: Express) {
  Object.defineProperty(app.request, 'getUser', {
    configurable: false,
    enumerable: true,
    async value(this: Request) {
      if (!this.user) this.user = await UserDao.find(this.getAuth().userId)

      return this.user
    },
  })
}
