import { StateCategoryUuid } from './stateCategory'
import { Uuid } from './uuid'

export type StateUuid = Uuid<'state'>
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
