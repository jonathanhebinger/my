import { Id, Entity } from '../uuid'

export type LifeEvent = 'life-event'
export type LifeEventId = Id<LifeEvent>
export type LifeEventEntity = Entity<LifeEvent> & {
  name: string
  info: string
  type: 'active' | 'passive'
  data: LifeEventValue
}

export type LifeEventValueBase<Type extends string> = {
  uuid: string
  name: string
  info: string
  tags: string[]
  type: Type
}
export type LifeEventValueNumber = LifeEventValueBase<'number'> & {
  unit: string
  min?: number
  max?: number
}
export type LifeEventValueSelect = LifeEventValueBase<'select'> & {
  options: {
    uuid: string
    name: string
  }[]
  multiple: boolean
}
export type LifeEventValueList = LifeEventValueBase<'list'> & {
  listType: LifeEventValue
  min?: number
  max?: number
}
export type LifeEventValueBranch = LifeEventValueBase<'branch'> & {
  branches: LifeEventValue[]
  multiple: boolean
}
export type LifeEventValueFacade = LifeEventValueBase<'facade'> & {
  multiple: boolean
  options: {
    path: string[]
    name: string
    data: any
  }
}

export type LifeEventValueObject = LifeEventValueBase<'object'> & {
  fields: LifeEventValue[]
  facade: LifeEventValue[]
}
export type LifeEventValue =
  | LifeEventValueNumber
  | LifeEventValueSelect
  | LifeEventValueObject
  | LifeEventValueNumber

// How do I feel
// What did I do
// What did happen

// How do I want to feel
// What should I do

export const Exercice: LifeEventValueObject = {
  uuid: '',
  name: '',
  info: '',
  tags: [],
  type: 'object',
  fields: [
    {
      uuid: '',
      name: 'type',
      info: '',
      tags: [],
      type: 'select',
      options: [
        { uuid: '', name: 'run' },
        { uuid: '', name: 'walk' },
        { uuid: '', name: 'swim' },
      ],
      multiple: false,
    },
    {
      uuid: '',
      name: 'duration',
      info: '',
      tags: [],
      type: 'number',
      unit: 's',
    },
  ],
  facade: [],
}
