import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getDoc, setDoc } from 'firebase/firestore'

import { getUserRef } from '@my/shared/firebase'
import { selectUser } from './selectors'
import { User } from '@my/shared/types'

export type UserCreatePayload = User & { uuid: string }

export const actionUserUpdate = createAction<Partial<User>>('user/create')

export const actionUserCreate = createAsyncThunk<void, UserCreatePayload>(
  'user/create',
  async ({ name, email }, { dispatch }) => {
    dispatch(actionUserUpdate({ name, email }))
    dispatch(actionUserApiSet())
  },
)

export const actionUserApiGet = createAsyncThunk<void, { uuid: string }>(
  'user/api/get',
  async ({ uuid }, { dispatch }) => {
    if (!uuid) throw new Error()

    const snapshot = await getDoc(getUserRef(uuid))
    const user = snapshot.data()

    if (!user) throw new Error()

    dispatch(actionUserUpdate(user))
  },
)
export const actionUserApiSet = createAsyncThunk(
  'user/api/set',
  async (_, { getState }) => {
    const { uuid, ...user } = selectUser(getState())

    if (!uuid) throw new Error()

    await setDoc(getUserRef(uuid), user)
  },
)
