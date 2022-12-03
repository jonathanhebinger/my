import { ThunkDispatch, AnyAction, Dispatch } from '@reduxjs/toolkit'
import { AuthState } from './auth'
import { DayState } from './day'
import { LogState } from './logs'
import { StatesState } from './states'
import { UserState } from './user'

export type AppState = {
  day: DayState
  log: LogState
  auth: AuthState
  user: UserState
  states: StatesState
}
export type AppDispatch = ThunkDispatch<AppState, undefined, AnyAction> &
  Dispatch<AnyAction>
