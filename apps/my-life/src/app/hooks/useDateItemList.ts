import { useMemo } from 'react'
import { Item } from '../types'
import useDate from './useDate'
import useItemList from './useItemList'

export default function useDateItemList() {
  const date = useDate()
  const itemList = useItemList()

  return useMemo(() => {
    const dateItemList = new Map<string, Item>()

    itemList.forEach(item => {
      dateItemList.set(item.uuid, item)

      if (item.type !== 'folder') return
    })

    return [...dateItemList]
  }, [itemList])
}
