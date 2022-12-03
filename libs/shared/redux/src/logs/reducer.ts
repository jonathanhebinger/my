import { assertDefined } from '@my/shared/helpers'
import { Day } from '@my/shared/types'
import { createReducer } from '@reduxjs/toolkit'
import {
  actionLogDayCreate,
  actionLogDayStateUpdate,
  actionLogDayUpdate,
} from './actions'
import { LogState, LogStateDay } from './state'

const logInitialState: LogState = {
  days: {},
}

export const logReducer = createReducer(logInitialState, builder =>
  builder
    .addCase(actionLogDayCreate, (state, { payload: day }) => {
      state.days[day] = createDay(day)
    })
    .addCase(actionLogDayUpdate, (state, { payload }) => {
      state.days[payload.day] = payload
    })
    .addCase(actionLogDayStateUpdate, (_state, { payload }) => {
      const logDay = selectDay(_state, payload.day)

      logDay.modified = true
      logDay.states[payload.state] = payload.value
    }),
)

function createDay(day: Day): LogStateDay {
  return {
    day,
    actions: {},
    states: {},
    modified: false,
  }
}
function selectDay(state: LogState, day: Day) {
  return assertDefined(state.days[day])
}
