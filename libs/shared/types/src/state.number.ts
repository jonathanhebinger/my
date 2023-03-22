import { StateBase } from './state'
import { Color, Icon } from './util'

export type StateNumber = StateBase & {
  type: 'number'
  unit: string
  step: number
  min: number
  max: number
  controls: StateNumberControl[]
}
export type StateNumberControl = {
  uuid: string
  name: string
  icon: Icon
  color: Color
  position: number
}
