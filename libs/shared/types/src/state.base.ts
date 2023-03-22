import { StateCategoryUuid } from './stateCategory'
import { Id } from './uuid'

export type StateUuid = Id
export type StateBase = {
  uuid: StateUuid
  name: string
  info: string
  period: StatePeriod
  categories: StateCategoryUuid[]
}

export type StatePeriod = {
  type: 'day' | 'week' | 'month' | 'year'
}
