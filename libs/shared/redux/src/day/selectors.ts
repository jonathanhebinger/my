import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '../state'
import { DAY } from './reducer'

export const selectDay = (state: AppState) => state.day
export const selectDate = createSelector(selectDay, day => new Date(day * DAY))
