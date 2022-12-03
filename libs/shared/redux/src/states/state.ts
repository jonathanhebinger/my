import { State, StateUuid } from '@my/shared/types'

export type States = Record<StateUuid, State>

export interface StatesState {
  states: States
}

export const STATES: States = {
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
