import {
  Action,
  UserCreateDto,
  UserDto,
  UserId,
  UserUpdateDto,
} from '@my/shared/types'

export type UserAction =
  | Action<'user.get', UserId, UserDto>
  | Action<'user.create', UserCreateDto, { user: UserDto; token: string }>
  | Action<'user.update', UserUpdateDto, UserDto>
  | Action<'user.delete', UserId, UserDto>
