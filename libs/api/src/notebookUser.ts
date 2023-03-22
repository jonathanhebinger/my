import {
  Action,
  NotebookId,
  NotebookUserCreateDto,
  NotebookUserDto,
  NotebookUserId,
  NotebookUserUpdateDto,
  UserId,
} from '@my/shared/types'

export type NotebookUserAction =
  | Action<'notebook-user.get', NotebookUserId, NotebookUserDto>
  | Action<'notebook-user.getAllByNotebook', NotebookId, NotebookUserDto[]>
  | Action<'notebook-user.getAllByUser', UserId, NotebookUserDto[]>
  | Action<'notebook-user.create', NotebookUserCreateDto, NotebookUserDto>
  | Action<'notebook-user.update', NotebookUserUpdateDto, NotebookUserDto>
  | Action<'notebook-user.delete', NotebookUserId, NotebookUserDto>
