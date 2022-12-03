import { StateNumberControl, StateUuid } from '@my/shared/types'
import constate from 'constate'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  actionLogNowStateUpdate,
  selectLogNowStateValueByStateId,
  selectStateById,
} from '@my/shared/redux'

export const [LogDayNumberProvider, useLogDayNumberContext] = constate(
  ({ uuid }: { uuid: StateUuid }) => {
    const state = useSelector(selectStateById(uuid))
    const stateValue = useSelector(selectLogNowStateValueByStateId(uuid))
    const dispatch = useDispatch()

    return useMemo(() => {
      if (state.type !== 'number') throw new Error()

      const type = state.typeNumber
      const { min, max, controls } = type

      const value = stateValue ?? (min + max) / 2

      let distance = Infinity
      let nearest: StateNumberControl | undefined

      controls.forEach(control => {
        const localDistance = Math.abs(value - control.position)

        if (distance < Math.abs(value - control.position)) return

        distance = localDistance
        nearest = control
      })

      const update = (position: number) =>
        dispatch(
          actionLogNowStateUpdate({
            state: uuid,
            value: position,
          }),
        )

      return { value, state, update, nearest, type }
    }, [dispatch, state, stateValue, uuid])
  },
)
