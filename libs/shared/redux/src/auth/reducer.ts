import { createReducer } from '@reduxjs/toolkit'
import { actionAuthSignedIn, actionAuthSignedOut } from './actions'
import { AuthState } from './state'

const authInitialState: AuthState = {
  loggedIn: false,
}

export const authReducer = createReducer(authInitialState, builder =>
  builder
    .addCase(actionAuthSignedIn, state => {
      state.loggedIn = true
    })
    .addCase(actionAuthSignedOut, state => {
      state.loggedIn = false
    }),
)
