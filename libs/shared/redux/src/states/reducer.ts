import { createReducer } from '@reduxjs/toolkit'
import { actionStatesSetOne } from './actions'
import { STATES, StatesState } from './state'

const statesInitialState: StatesState = {
  states: STATES,
}

export const statesReducer = createReducer(statesInitialState, builder =>
  builder.addCase(actionStatesSetOne, (state, { payload }) => {
    state.states[payload.uuid] = payload
  }),
)
