import { createReducer } from '@reduxjs/toolkit'
import { actionDayAdd, actionDaySet } from './actions'
import { DayState } from './state'

export const DAY = 24 * 60 * 60 * 1000
export const DAY_INV = 1 / DAY

const dayInitialState: DayState = Math.floor(Date.now() * DAY_INV)

export const dayReducer = createReducer(dayInitialState, builder =>
  builder
    .addCase(actionDaySet, (state, { payload }) => {
      return payload
    })
    .addCase(actionDayAdd, (state, { payload }) => {
      return state + payload
    }),
)
