export type SchemaBase<Type extends string> = {
  uuid: string
  name: string
  info: string
  type: Type
  required: boolean
  default?: any
}

// Primitive
export type SchemaBool = SchemaBase<'number'>
export type SchemaNumber = SchemaBase<'number'> & {
  unit: string
  min?: number
  max?: number
}
export type SchemaString = SchemaBase<'string'> & {
  min?: number
  max?: number
  pattern?: string
}
export type SchemaSelect = SchemaBase<'select'> & {
  select: SchemaSelectOption[]
  repeat: boolean
  multiple: boolean
}
export type SchemaSelectOption = {
  uuid: string
  name: string
  info: string
}

// Complexe
export type SchemaList = SchemaBase<'list'> & {
  list: Schema
  min?: number
  max?: number
}
export type SchemaBranch = SchemaBase<'branch'> & {
  branches: Schema[]
  multiple: boolean
}
export type SchemaObject = SchemaBase<'object'> & {
  fields: Schema[]
  facade: SchemaFacade[]
}

export type Schema =
  | SchemaBool
  | SchemaString
  | SchemaNumber
  | SchemaSelect
  | SchemaObject
  | SchemaNumber

export type SchemaFacade = SchemaBase<'facade'> & {
  multiple: boolean
  options: {
    path: string[]
    name: string
    data: any
  }
}

export const Exercice: SchemaObject = {
  uuid: '',
  name: '',
  info: '',
  required: true,
  type: 'object',
  fields: [
    {
      uuid: '',
      name: 'type',
      info: '',
      required: true,
      type: 'select',
      select: [
        { uuid: '', name: 'run', info: '' },
        { uuid: '', name: 'walk', info: '' },
        { uuid: '', name: 'swim', info: '' },
      ],
      repeat: false,
      multiple: false,
    },
    {
      uuid: '',
      name: 'duration',
      info: '',
      required: false,
      type: 'number',
      unit: 's',
    },
  ],
  facade: [],
}
