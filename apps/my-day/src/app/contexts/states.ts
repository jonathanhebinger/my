import constate from 'constate'
import { useMemo, useState } from 'react'
import { v4 } from 'uuid'
import { usePatcher } from '../hooks/usePatcher'
import { State, StateUuid } from '@my/shared/types'

export type States = Record<StateUuid, State>

const STATES: States = {
  'well.being': {
    uuid: 'well.being',
    name: 'Well Being',
    info: '',
    type: 'number',
    typeNumber: {
      min: 0,
      max: 100,
      step: 5,
      unit: '',
      controls: [
        {
          uuid: '1',
          position: 0,
          name: 'Very Unhappy',
          icon: 'SentimentVeryDissatisfied',
          color: 'error',
        },
        {
          uuid: '2',
          position: 20,
          name: 'Unhappy',
          icon: 'SentimentDissatisfied',
          color: 'warning',
        },
        {
          uuid: '3',
          position: 50,
          name: 'Neutral',
          icon: 'SentimentNeutral',
          color: 'inherit',
        },
        {
          uuid: '4',
          position: 80,
          name: ' Happy',
          icon: 'SentimentSatisfied',
          color: 'success',
        },
        {
          uuid: '5',
          position: 100,
          name: 'Very Happy',
          icon: 'SentimentVerySatisfied',
          color: 'primary',
        },
      ],
    },
    categories: [],
    period: { type: 'day' },
  },
}
export const [StatesProvider, useStatesContext] = constate(() => {
  const [states, setStates] = useState(STATES)

  const patch = usePatcher(states, setStates)

  return useMemo(() => {
    const all = Object.keys(states)

    const day = all.filter(key => {
      return states[key].period.type === 'day'
    })
    const week = all.filter(key => {
      return states[key].period.type === 'week'
    })
    const month = all.filter(key => {
      return states[key].period.type === 'month'
    })
    const year = all.filter(key => {
      return states[key].period.type === 'year'
    })

    const create = (state: State) =>
      patch(states => {
        const uuid = v4()
        state.uuid = uuid
        states[uuid] = state
      })
    const update = (state: State) =>
      patch(states => {
        states[state.uuid] = state
      })
    const remove = (uuid: StateUuid) =>
      patch(states => {
        delete states[uuid]
      })

    return {
      states,
      create,
      update,
      remove,
      keys: {
        all,
        day,
        week,
        month,
        year,
      },
    }
  }, [states, patch])
})
