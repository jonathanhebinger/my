import { NotebookUserEntity } from '../entities'
import { EntityToDto } from '../uuid'

export type NotebookUserDto = EntityToDto<NotebookUserEntity>
export type NotebookUserCreateDtoKeys = 'notebook' | 'user' | 'role'
export type NotebookUserUpdateDtoKeys = 'id' | NotebookUserCreateDtoKeys
export type NotebookUserCreateDto = Pick<
  NotebookUserDto,
  NotebookUserCreateDtoKeys
>
export type NotebookUserUpdateDto = Pick<
  NotebookUserDto,
  NotebookUserUpdateDtoKeys
>
