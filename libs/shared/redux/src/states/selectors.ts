import { StateUuid } from '@my/shared/types'
import { AppState } from '../state'

export const selectStates = (state: AppState) => state.states
export const selectStateById = (uuid: StateUuid) => (state: AppState) =>
  selectStates(state).states[uuid]
