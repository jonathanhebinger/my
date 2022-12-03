import {
  actionLogDayCreate,
  selectDay,
  selectLog,
  useAppDispatch,
} from '@my/shared/redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LogNowStates } from './LogNowStates'

export default function LogNow() {
  const day = useSelector(selectDay)
  const log = useSelector(selectLog)
  const logDay = log.days[day]

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (logDay) return

    dispatch(actionLogDayCreate(day))
  }, [day, dispatch, logDay])

  if (logDay) {
    return <LogNowStates />
  } else {
    return null
  }
}
