import { createReducer } from '@reduxjs/toolkit'
import { actionUserUpdate } from './actions'
import { UserState } from './state'

const userInitialState: UserState = {
  uuid: '',
  name: '',
  email: '',
}

export const userReducer = createReducer(userInitialState, builder =>
  builder.addCase(actionUserUpdate, (state, payload) => {
    Object.assign(state, payload)
  }),
)
