import {
  State,
  StateChoiceData,
  StateNumberData,
  StateUuid,
} from '@my/shared/types'
import constate from 'constate'
import { useMemo } from 'react'
import { useStatesContext } from './states'

export const DEFAULT_STATE_TYPE_NUMBER: StateNumberData = {
  min: 0,
  max: 100,
  step: 5,
  unit: '',
  controls: [],
}
export const DEFAULT_STATE: State = {
  uuid: '',
  name: '',
  info: '',
  period: { type: 'day' },
  categories: [],
  type: 'number',
  typeNumber: DEFAULT_STATE_TYPE_NUMBER,
}

export const [StateProvider, useStateContext] = constate(
  ({ uuid = '' }: { uuid?: StateUuid }) => {
    const { states, create, update, remove } = useStatesContext()

    const state = states[uuid] || DEFAULT_STATE

    return useMemo(() => {
      const updateState = (state: State) =>
        state.uuid ? update(state) : create(state)
      const removeState = (state: State) => remove(state.uuid)
      const updateStateTypeNumber = (typeNumber: StateNumberData) =>
        updateState({ ...state, type: 'number', typeNumber })
      const updateStateTypeChoice = (typeChoice: StateChoiceData) =>
        updateState({ ...state, type: 'choice', typeChoice })

      return {
        state,
        updateState,
        updateStateTypeNumber,
        updateStateTypeChoice,
        removeState,
      }
    }, [state, create, update, remove])
  },
)
