import { useItemContext } from '../../contexts'
import { Item } from '../../types'
import MyLifeItemNumber from './ItemNumber'
import MyLifeItemFolder from './ItemFolder'
import MyLifeItemSelect from './ItemSelect'

export default function MyLifeItem({ item }: { item: Item }) {
  const { updateItem } = useItemContext()

  switch (item.type) {
    case 'select':
      return <MyLifeItemSelect item={item} onChange={updateItem} />
    case 'number':
      return <MyLifeItemNumber item={item} onChange={updateItem} />
    case 'folder':
      return <MyLifeItemFolder item={item} onChange={updateItem} />
  }
}
