import constate from 'constate'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useDate from '../hooks/useDate'
import useModified from '../hooks/useModified'
import { usePageCloseOrRefresh } from '../hooks/usePageClose'
import usePrevious from '../hooks/usePrevious'
import useUserUuid from '../hooks/useUserUuid'
import { Item, ItemData } from '../types'
import { useDataContext } from './data'

export const [DateDataContextProvider, useDateDataContext] = constate(() => {
  const user = useUserUuid()
  const { createDateData, updateDateData, list: dataList } = useDataContext()
  const date = useDate()
  const dateData = useMemo(() => {
    return (
      dataList.find(data => data.date === date) || {
        uuid: '',
        user,
        date,
        data: {},
      }
    )
  }, [user, dataList, date])
  const [changes, setChanges] = useState<Record<string, number[] | null>>({})
  const dateDataModified = useModified(dateData.date)
  const dateDataMerged = useMemo(() => {
    const data = { ...dateData.data }

    Object.entries(changes).forEach(([itemUuid, itemData]) => {
      if (itemData === null) {
        delete data[itemUuid]
      } else {
        data[itemUuid] = itemData
      }
    })

    return { ...dateData, data }
  }, [dateData, changes])
  const dateDataPrevious = usePrevious(dateDataMerged)

  const update = useCallback(() => {
    if (!Object.keys(changes).length) return

    if (dateDataPrevious.uuid) {
      updateDateData(dateDataPrevious)
      console.log(dateDataPrevious)
    } else {
      createDateData(dateDataPrevious)
    }

    setChanges({})
  }, [changes, dateDataPrevious, createDateData, updateDateData])

  usePageCloseOrRefresh(update)
  useEffect(() => {
    if (dateDataModified) update()
  }, [dateDataModified, update])

  function upsert(item: Item, data: ItemData) {
    setChanges(record => ({ ...record, [item.uuid]: data }))
  }
  function remove(item: Item) {
    setChanges(record => ({ ...record, [item.uuid]: null }))
  }

  return { ...dateDataMerged, upsert, remove }
})
