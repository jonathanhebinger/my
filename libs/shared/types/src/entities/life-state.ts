import { Id, Entity } from '../uuid'

export type LifeState = 'life-state'
export type LifeStateId = Id<LifeState>

export type LifeStateEntity =
  | LifeStateEntityTypeNumber
  | LifeStateEntityTypeChoice
export type LifeStateEntityBase = Entity<LifeState, true> & {
  name: string
  info: string
}

export type LifeStateEntityTypeNumber = LifeStateEntityBase & {
  type: 'number'
  unit: string
  min: number
  max: number
}

export type LifeStateEntityTypeChoice = LifeStateEntityBase & {
  type: 'choice'
  ordered: boolean
  options: LifeStateEntityTypeChoiceOption[]
}
export type LifeStateEntityTypeChoiceOption = {
  uuid: number
  name: string
}

export type LifeStateEntityTypeFacade = LifeStateEntityBase & {
  type: 'facade'
  multiple: boolean
  ordered: boolean
  options: LifeStateEntityTypeFacadeOption[]
}
export type LifeStateEntityTypeFacadeOption = {
  state: LifeStateId
  value: number
  name?: string
}
