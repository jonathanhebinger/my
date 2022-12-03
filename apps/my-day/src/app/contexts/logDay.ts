import {
  actionLogNowStateUpdate,
  selectLogNow,
  selectLogNowStateValueByStateId,
} from '@my/shared/redux'
import { StateUuid } from '@my/shared/types'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useLogNow = () => {
  return useSelector(selectLogNow)
}
export const useLogNowStateValue = (state: StateUuid) => {
  return useSelector(selectLogNowStateValueByStateId(state))
}
export const useLogNowStateUpdate = () => {
  const dispatch = useDispatch()

  return useCallback(
    (state: StateUuid, value: number) => {
      dispatch(actionLogNowStateUpdate({ state, value }))
    },
    [dispatch],
  )
}
