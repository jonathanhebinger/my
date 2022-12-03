import { StateUuid } from './state'
import { Uuid } from './uuid'

export type StateCategoryUuid = Uuid<'state.category'>
export type StateCategory = {
  uuid: StateCategoryUuid
  name: string
  info: string
  states: StateUuid
}
