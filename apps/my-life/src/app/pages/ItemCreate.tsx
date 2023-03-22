import { useNavigate } from 'react-router'
import MyLifeItemCreate from '../components/Item/ItemCreate'
import { useItemContext } from '../contexts'
import { Item } from '../types'

export default function MyLifeItemCreatePage() {
  const navigate = useNavigate()

  const { createItem: insertItem } = useItemContext()

  async function handleCreate(item: Item) {
    await insertItem(item)
    navigate(`/item/edit/${item.uuid}`)
  }

  return <MyLifeItemCreate onCreate={handleCreate} />
}
