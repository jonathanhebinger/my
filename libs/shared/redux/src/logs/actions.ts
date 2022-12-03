import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { Day, StateUuid, StateValue } from '@my/shared/types'
import { selectUserUuid } from '../user'
import { logApi } from './api'
import { selectLog } from './selectors'
import { LogStateDay } from './state'

export type LogDayCreatePayload = Day
export type LogDayUpdatePayload = LogStateDay
export type LogNowStateUpdatePayload = {
  state: StateUuid
  value: StateValue
}
export type LogDayStateUpdatePayload = LogNowStateUpdatePayload & {
  day: Day
}

export const actionLogDayCreate =
  createAction<LogDayCreatePayload>('log/day/create')
export const actionLogDayUpdate =
  createAction<LogDayUpdatePayload>('log/day/update')
export const actionLogDayStateUpdate = createAction<LogDayStateUpdatePayload>(
  'log/day/state/update',
)
export const actionLogNowStateUpdate = createAction<LogNowStateUpdatePayload>(
  'log/now/state/update',
)

export const actionLogDayApiGet = createAsyncThunk<void, Day>(
  'log/day/api/get',
  async (day, { getState, dispatch }) => {
    const uuid = selectUserUuid(getState())

    if (!uuid) throw new Error()

    const data = await logApi.getOne(uuid, day)

    dispatch(actionLogDayUpdate({ ...data, modified: false }))
  },
)
export const actionLogDayApiSet = createAsyncThunk<void, Day>(
  'log/day/api/set',
  async (day, { getState }) => {
    const uuid = selectUserUuid(getState())

    if (!uuid) throw new Error()

    const logDay = selectLog(getState()).days[day]

    if (!logDay) throw new Error()

    const { actions, states } = logDay

    logApi.setOne(uuid, { day, actions, states })
  },
)
