import { State } from './state'
import { Uuid } from './uuid'

export type ActionUuid = Uuid<'action'>
export type Action = {
  uuid: ActionUuid
  name: string
  info: string
  categories: ActionCategoryUuid[]
  states: State[]
}
export type ActionCategoryUuid = Uuid<'action.category'>
