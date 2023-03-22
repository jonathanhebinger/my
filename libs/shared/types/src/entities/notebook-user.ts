import { Entity, Id } from '../uuid'
import { WithDate } from '../with.date'
import { NotebookId } from './notebook'
import { UserId } from './user'

export type NotebookUser = 'notebook--user'
export type NotebookUserId = Id<NotebookUser>
export type NotebookUserEntity = Entity<NotebookUser, true> & {
  notebook: NotebookId
  user: UserId
  role: NotebookUserEntityRole
} & WithDate
export type NotebookUserEntityRoleKeys =
  | 'manage'
  | 'create'
  | 'update'
  | 'delete'
export type NotebookUserEntityRole = Record<NotebookUserEntityRoleKeys, boolean>
