import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import useItemList from '../../hooks/useItemList'
import { ItemFolder } from '../../types'
import MyLifeItemBase from './ItemBase'

export interface MyLifeItemSagaProps {
  item: ItemFolder
  onChange: (item: ItemFolder) => void
}
export default function MyLifeItemFolder({
  item,
  onChange,
}: MyLifeItemSagaProps) {
  const [base, setBase] = useState(() => {
    const { name, info, tags } = item

    return { name, info, tags }
  })
  const [saga, setSaga] = useState(item.itemList)

  const itemList = useItemList()
  const sagaList = useItemList(saga).filter(cursor => cursor !== item)

  function handleChange() {
    const { uuid, user, type } = item

    onChange({ uuid, user, type, ...base, itemList: saga })
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">{item.name}</Typography>
        <Button onClick={handleChange}>Update</Button>
      </Stack>
      <MyLifeItemBase item={base} onChange={setBase} />
      <Autocomplete
        size="small"
        value={sagaList}
        multiple
        options={itemList}
        getOptionLabel={item => item.name}
        filterSelectedOptions
        renderInput={params => <TextField {...params} variant="outlined" />}
        onChange={(e, selected) => setSaga(selected.map(item => item.uuid))}
      />
    </Stack>
  )
}
