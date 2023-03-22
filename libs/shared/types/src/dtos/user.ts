import { UserEntity } from '../entities'
import { EntityToDto } from '../uuid'

export type UserDto = Omit<EntityToDto<UserEntity>, 'password'>
export type UserCreateDtoKeys = 'name' | 'email'
export type UserUpdateDtoKeys = 'id' | UserCreateDtoKeys
export type UserCreateDto = Pick<UserDto, UserCreateDtoKeys> & {
  password: string
}
export type UserUpdateDto = Pick<UserDto, UserUpdateDtoKeys> & {
  password: string
}
