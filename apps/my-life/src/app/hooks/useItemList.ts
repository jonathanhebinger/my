import { useMemo } from 'react'
import { useItemContext } from '../contexts'
import { Item } from '../types'

export default function useItemList(uuidList?: string[]) {
  const { itemList } = useItemContext()

  return useMemo(() => {
    if (!uuidList) return itemList

    return uuidList.reduce((list, itemUuid) => {
      const item = itemList.find(item => item.uuid === itemUuid)

      if (item) list.push(item)

      return list
    }, [] as Item[])
  }, [itemList, uuidList])
}
