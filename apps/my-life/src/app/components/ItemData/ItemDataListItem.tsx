import { List, Numbers } from '@mui/icons-material'
import { Item } from '../../types'
import MyLifeItemData from './ItemData'
import MyLifeItemDataListItemBase from './ItemDataListItemBase'

export interface MyLifeItemDataListItemProps {
  item: Item
}
export default function MyLifeItemDataListItem({
  item,
}: MyLifeItemDataListItemProps) {
  switch (item.type) {
    case 'folder':
      return null
    case 'number':
      return (
        <MyLifeItemDataListItemBase
          icon={<Numbers />}
          name={item.name}
          data={<MyLifeItemData item={item} />}
        />
      )
    case 'select':
      return (
        <MyLifeItemDataListItemBase
          icon={<List />}
          name={item.name}
          data={<MyLifeItemData item={item} />}
        />
      )
  }
}
