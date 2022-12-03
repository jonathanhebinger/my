import { StateBase } from './state.base'
import { Color, Icon } from './util'

export type StateChoice = StateBase & {
  type: 'choice'
  typeChoice: StateChoiceData
}
export type StateChoiceData = {
  options: StateChoiceOption[]
}
export type StateChoiceOption = {
  uuid: number
  value: number
  name: string
  icon: Icon
  color: Color
}
