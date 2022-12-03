import { assertDefined } from '@my/shared/helpers'
import { StateUuid } from '@my/shared/types'
import { createSelector } from '@reduxjs/toolkit'
import { selectDay } from '../day'
import { AppState } from '../state'
import { selectStates } from '../states'

export const selectLog = (state: AppState) => state.log
export const selectLogNow = createSelector(selectLog, selectDay, (log, day) => {
  return assertDefined(log.days[day])
})

export const selectLogNowStatesMap = createSelector(
  selectStates,
  selectLogNow,
  (states, logNow) => {
    const keys = Object.keys(states.states)
    const entries = keys.map((key: StateUuid) => {
      const state = states.states[key]
      const value = logNow.states[key] || 0

      return [key, { state, value }] as const
    })

    return new Map(entries)
  },
)
export const selectLogNowStateEntryByStateId =
  (uuid: StateUuid) => (app: AppState) => {
    return assertDefined(selectLogNowStatesMap(app).get(uuid))
  }
export const selectLogNowStateValueByStateId =
  (uuid: StateUuid) => (app: AppState) =>
    selectLogNowStateEntryByStateId(uuid)(app).value
