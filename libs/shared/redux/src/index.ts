export * from './store'
export * from './state'

export * from './auth'
export * from './day'
export * from './logs'
export * from './user'
export * from './states'

import { useDispatch } from 'react-redux'
import { AppDispatch } from './state'

export const useAppDispatch: () => AppDispatch = useDispatch
