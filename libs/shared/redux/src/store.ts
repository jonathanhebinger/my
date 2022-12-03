import { auth } from '@my/shared/firebase'
import { AnyAction, configureStore } from '@reduxjs/toolkit'
import { actionAuthSignedIn, authReducer } from './auth'
import { dayReducer } from './day'
import { logReducer } from './logs'
import { AppState } from './state'
import { statesReducer } from './states'
import { actionUserApiGet, selectUser, userReducer } from './user'

export const store = configureStore<AppState, AnyAction>({
  reducer: {
    auth: authReducer,
    user: userReducer,
    day: dayReducer,
    log: logReducer,
    states: statesReducer,
  },
  // devTools: process.env['NODE_ENV'] !== 'production',
  enhancers: [],
})

auth.onAuthStateChanged(state => {
  if (!state) return

  store.dispatch(actionAuthSignedIn())

  if (selectUser(store.getState())) return

  store.dispatch(actionUserApiGet({ uuid: state.uid }))
})
