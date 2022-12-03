import { Actions } from './actions'
import { Day } from './day'
import { States } from './states'

export type LogDay = {
  day: Day
  states: States
  actions: Actions
}
