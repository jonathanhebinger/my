import { useMemo } from 'react'
import useItemList from './useItemList'

export default function useItem(itemUuid: string) {
  const itemList = useItemList()
  const item = useMemo(() => {
    return itemList.find(item => item.uuid === itemUuid)
  }, [itemList, itemUuid])

  if (!item) return

  return item
}
