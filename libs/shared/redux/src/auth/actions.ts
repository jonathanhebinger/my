import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import { auth } from '@my/shared/firebase'
import { actionUserApiGet, actionUserCreate } from '../user'
import { selectAuthSignedIn } from './selectors'

export type AuthSignInPayload = {
  email: string
  password: string
}
export type AuthSignUpPayload = {
  name: string
  email: string
  password: string
}

export const actionAuthSignedIn = createAction('auth/signedIn')
export const actionAuthSignedOut = createAction('auth/signedOut')
export const actionAuthSignIn = createAsyncThunk<void, AuthSignInPayload>(
  'auth/signIn',
  async ({ email, password }, { getState, dispatch }) => {
    const signedIn = selectAuthSignedIn(getState())

    if (signedIn) return

    await signInWithEmailAndPassword(auth, email, password)

    const uuid = auth.currentUser?.uid

    if (!uuid) throw new Error()

    dispatch(actionAuthSignedIn())
    dispatch(actionUserApiGet({ uuid }))
  },
)
export const actionAuthSignUp = createAsyncThunk<void, AuthSignUpPayload>(
  'auth/signUp',
  async ({ name, email, password }, { dispatch }) => {
    await createUserWithEmailAndPassword(auth, email, password)

    const uuid = auth.currentUser?.uid

    if (!uuid) throw new Error()

    dispatch(actionAuthSignedIn())
    dispatch(actionUserCreate({ uuid, name, email }))
  },
)
export const actionAuthLogOut = createAsyncThunk(
  'auth/logOut',
  async (_, { dispatch }) => {
    await signOut(auth)
    dispatch(actionAuthSignedOut())
  },
)
