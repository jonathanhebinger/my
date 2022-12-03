import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '../state'

export const selectUser = (state: AppState) => state.user
export const selectUserUuid = createSelector(selectUser, auth => auth.uuid)
export const selectUserName = createSelector(selectUser, auth => auth.name)
