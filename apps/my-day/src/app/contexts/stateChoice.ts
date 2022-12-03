import constate from 'constate'
import { useMemo } from 'react'
import { useStateContext } from './state'

export const [StateNumberProvider, useStateNumberContext] = constate(() => {
  const { type } = useStateContext().state

  return useMemo(() => {
    if (type !== 'choice') throw new Error()

    return { type }
  }, [type])
})
