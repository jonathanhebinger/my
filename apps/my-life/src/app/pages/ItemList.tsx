import { useNavigate } from 'react-router-dom'
import MyLifeItemList from '../components/Item/ItemList'

export default function MyLifeItemListPage() {
  const navigate = useNavigate()

  return (
    <MyLifeItemList
      onCreate={() => navigate('create')}
      onSelect={item => navigate(`edit/${item.uuid}`)}
    />
  )
}
