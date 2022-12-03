import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '../state'

export const selectAuth = (state: AppState) => state.auth
export const selectAuthSignedIn = createSelector(
  selectAuth,
  auth => auth.loggedIn,
)
