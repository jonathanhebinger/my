import { LogDay } from '@my/shared/types'

export interface LogStateDay extends LogDay {
  modified: boolean
}
export interface LogState {
  days: Record<number, LogStateDay | undefined>
}
