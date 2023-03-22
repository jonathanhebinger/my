import MyLifeItemDataList from '../components/ItemData/ItemDataList'
import useItemList from '../hooks/useItemList'

export default function MyLifeTrackingPage() {
  const itemList = useItemList()

  return <MyLifeItemDataList itemList={itemList} />
}
