import { selectLogNowStateValueByStateId } from '@my/shared/redux'
import { StateUuid } from '@my/shared/types'
import constate from 'constate'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useLogNow, useLogNowStateUpdate } from './logDay'
import { useStatesContext } from './states'

export const [LogDayChoiceProvider, useLogDayChoiceContext] = constate(
  ({ uuid }: { uuid: StateUuid }) => {
    const { states } = useStatesContext()
    const logNow = useLogNow()
    const logNowStateUpdate = useLogNowStateUpdate()
    const stateValue = useSelector(selectLogNowStateValueByStateId(uuid))

    if (!logNow) throw new Error()

    const state = states[uuid]

    return useMemo(() => {
      if (state.type !== 'choice') throw new Error()

      const { options } = state.typeChoice

      const update = (value: number) => logNowStateUpdate(state.uuid, value)

      return { options, value: stateValue, update }
    }, [state, logNowStateUpdate, stateValue])
  },
)
