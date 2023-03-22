import { Card, Stack } from '@mui/material'
import useItemList from '../../hooks/useItemList'
import { ItemFolder } from '../../types'
import MyLifeItemData from './ItemData'

export default function MyLifeItemDataSaga({ item }: { item: ItemFolder }) {
  const sagaList = useItemList(item.itemList)
  const SagaList = sagaList.map(item => (
    <MyLifeItemData item={item} key={item.uuid} />
  ))

  return (
    <Card variant="outlined">
      <Stack padding={2} spacing={2}>
        {SagaList}
      </Stack>
    </Card>
  )
}
