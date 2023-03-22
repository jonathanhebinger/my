import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { UserModel } from '@my/models'
import { actionBus } from '../action'

actionBus.register('auth.signIn', async ({ email, password }) => {
  const user = await UserModel.findOne({ email })

  if (!user) throw new Error('User not found')

  const valid = await compare(password, user.password)

  if (!valid) throw new Error('Password unvalid')

  return {
    userId: user.id,
    token: sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
      expiresIn: '24h',
    }),
  }
})
