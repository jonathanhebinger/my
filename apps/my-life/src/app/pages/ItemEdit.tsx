import { useParams } from 'react-router-dom'
import MyLifeItem from '../components/Item/Item'
import useItem from '../hooks/useItem'

export default function MyLifeItemEditPage() {
  const { itemUuid } = useParams<{ itemUuid: string }>()
  const item = useItem(itemUuid || '')

  if (!item) return null

  return <MyLifeItem item={item} key={itemUuid} />
}
