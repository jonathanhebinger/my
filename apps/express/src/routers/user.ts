import { hash } from 'bcrypt'
import { Router } from 'express'
import { sign } from 'jsonwebtoken'

import { UserDao } from '@my/models'

import { actionBus } from '../action'
import { Mapper } from '../mapper'

const userRouter = Router()

actionBus.register('user.get', async (userId, req) => {
  if (userId !== req.getAuth().userId) throw new Error()

  const user = await UserDao.find(userId)

  if (!user) throw new Error()

  return Mapper.user(user)
})
actionBus.register('user.create', async userCreateDto => {
  const { name, email, password } = userCreateDto

  if (await UserDao.findByMail(email)) throw new Error()

  const user = Mapper.user(
    await UserDao.create({
      name,
      email,
      password: await hash(password, 10),
    }),
  )

  const token = sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
    expiresIn: '24h',
  })

  return { user, token }
})
actionBus.register('user.update', async (userUpdateDto, req) => {
  const authUserId = req.getAuth().userId

  if (userUpdateDto.id !== authUserId) throw new Error()

  const emailUser = await UserDao.findByMail(userUpdateDto.email)

  if (emailUser && emailUser.id !== authUserId) throw new Error()

  const user = await UserDao.update(authUserId, userUpdateDto)

  if (!user) throw new Error()

  return Mapper.user(user)
})
actionBus.register('user.delete', async (userId, req) => {
  const authUserId = req.getAuth().userId

  if (userId !== authUserId) throw new Error()

  const user = await UserDao.delete(userId)

  if (!user) throw new Error()

  return Mapper.user(user)
})

export default userRouter
