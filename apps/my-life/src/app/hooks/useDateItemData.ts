import { useDateDataContext } from '../contexts'
import { Item } from '../types'

export default function useDateItemData(item: Item) {
  const dateData = useDateDataContext()
  const itemData = dateData.data[item.uuid]

  if (itemData) return itemData

  return item.type === 'number' ? [item.min || 0] : []
}
