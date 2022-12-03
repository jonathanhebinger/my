import constate from 'constate'
import { useMemo } from 'react'
import { StateNumberControl } from '@my/shared/types'
import { useStateContext } from './state'

export const [StateNumberProvider, useStateNumberContext] = constate(() => {
  const { state, updateStateTypeNumber } = useStateContext()

  if (state.type !== 'number') throw new Error()

  return useMemo(() => {
    const type = state.typeNumber

    const upsertControl = (control: StateNumberControl) => void 0
    const removeControl = (control: StateNumberControl) => void 0

    return {
      type,
      updateStateTypeNumber,
      upsertControl,
      removeControl,
    }
  }, [state.typeNumber, updateStateTypeNumber])
})
