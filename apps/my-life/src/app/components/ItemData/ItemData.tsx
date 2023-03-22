import { Item } from '../../types'
import MyLifeItemDataNumber from './ItemDataNumber'
import MyLifeItemDataSelect from './ItemDataSelect'

export default function MyLifeItemData({ item }: { item: Item }) {
  switch (item.type) {
    case 'select':
      return <MyLifeItemDataSelect item={item} />
    case 'number':
      return <MyLifeItemDataNumber item={item} />
    case 'folder':
      return null
  }
}
