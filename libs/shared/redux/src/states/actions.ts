import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getDoc, setDoc } from 'firebase/firestore'

import { getStateRef } from '@my/shared/firebase'
import { State } from '@my/shared/types'
import { selectStates } from './selectors'

export const actionStatesSetOne = createAction<State>('states/set')

export const actionStatesApiGetOne = createAsyncThunk<void, string>(
  'states.api/get.one',
  async (uuid, { dispatch }) => {
    if (!uuid) throw new Error()

    const snapshot = await getDoc(getStateRef(uuid))
    const data = snapshot.data()

    if (!data) throw new Error()

    dispatch(actionStatesSetOne(data))
  },
)
export const actionStatesApiSetOne = createAsyncThunk<void, string>(
  'states.api/set.one',
  async (uuid, { getState }) => {
    if (!uuid) throw new Error()

    const state = selectStates(getState()).states[uuid]

    if (!state) throw new Error()

    setDoc(getStateRef(uuid), state)
  },
)
