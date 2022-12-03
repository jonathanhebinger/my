import { createAction } from '@reduxjs/toolkit'

import { Day } from '@my/shared/types'

export const actionDaySet = createAction<Day>('day/set')
export const actionDayAdd = createAction<Day>('day/add')
