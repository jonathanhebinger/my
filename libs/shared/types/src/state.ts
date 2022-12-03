import { StateChoice } from './state.choice'
import { StateNumber } from './state.number'

export type State = StateNumber | StateChoice
export type StateType = State['type']

export type StateValue = number

export * from './state.base'
export * from './state.choice'
export * from './state.number'
