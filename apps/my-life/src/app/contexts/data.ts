import constate from 'constate'
import { useEffect } from 'react'
import {
  createDateData,
  onDateDataSnapshot,
  removeDateData,
  updateDateData,
} from '../firebase/itemData'
import useRecord from '../hooks/useRecord'
import { Data } from '../types'

export const [DataContextProvider, useDataContext] = constate(() => {
  const { list, record, remove, upsert } = useRecord<Data>(
    [],
    item => item.uuid,
  )

  useEffect(() => {
    return onDateDataSnapshot(upsert, upsert, remove)
  }, [upsert, remove])

  return {
    list,
    record,
    createDateData,
    updateDateData,
    removeDateData,
  }
})
