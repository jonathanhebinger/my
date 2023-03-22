import {
  UserCreateDto,
  UserEntity,
  UserUpdateDto,
  UserId,
} from '@my/shared/types'
import { UserModel } from '../models'

export interface iUserDao {
  findByMail(email: string): Promise<null | UserEntity>
  find(userId: UserId): Promise<null | UserEntity>
  create(userCreateDto: UserCreateDto): Promise<UserEntity>
  update(
    userId: UserId,
    userUpdateDto: UserUpdateDto,
  ): Promise<null | UserEntity>
  delete(userId: UserId): Promise<null | UserEntity>
}

export const UserDao: iUserDao = {
  async findByMail(email) {
    return await UserModel.findOne({ email })
  },
  async find(userId) {
    console.log(await UserModel.findById(userId))
    return await UserModel.findById(userId)
  },
  async create(userCreateDto) {
    return await new UserModel(userCreateDto).save()
  },
  async update(userId, userUpdateDto) {
    return await UserModel.findByIdAndUpdate(userId, userUpdateDto)
  },
  async delete(userId) {
    return await UserModel.findByIdAndDelete(userId)
  },
}
