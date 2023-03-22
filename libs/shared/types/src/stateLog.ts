import { StateUuid } from './state'
import { Id } from './uuid'

export type StateLog = {
  uuid: Id
  type: StateUuid
  data: number
  date: number
}
