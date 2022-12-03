import { StateUuid } from './state'
import { Uuid } from './uuid'

export type StateLog = {
  uuid: Uuid<'state.log'>
  type: StateUuid
  data: number
  date: number
}
