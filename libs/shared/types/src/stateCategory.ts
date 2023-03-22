import { StateUuid } from './state'
import { Id } from './uuid'

export type StateCategoryUuid = Id
export type StateCategory = {
  uuid: StateCategoryUuid
  name: string
  info: string
  states: StateUuid
}
