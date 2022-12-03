import produce from 'immer'
import { useCallback, useRef } from 'react'

export function usePatcher<State>(
  state: State,
  setState?: (state: State) => void,
) {
  const stateRef = useRef(state)

  stateRef.current = state

  return useCallback(
    (patch: (state: State) => void) => {
      const update = produce(stateRef.current, patch)

      if (setState) setState(update)

      return update
    },
    [setState],
  )
}
