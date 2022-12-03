import { ActionUuid } from '../action'

export type Actions = Record<ActionUuid, { [index: string]: number }[]>
