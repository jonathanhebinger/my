import { useMemo } from 'react'
import useItemList from './useItemList'

export default function useItemListTags() {
  const itemList = useItemList()

  return useMemo(() => {
    const tags = new Set<string>()

    itemList.forEach(item => {
      item.tags.forEach(tag => tags.add(tag))
    })

    return [...tags]
  }, [itemList])
}
