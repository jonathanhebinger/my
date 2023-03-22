import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Item, ItemSelect, ItemSelectOption } from '../../types'
import MyLifeItemBase from './ItemBase'
import { MyLifeItemSelectOption } from './ItemSelectOption'

export default function MyLifeItemSelect({
  item,
  onChange,
}: {
  item: ItemSelect
  onChange: (item: Item) => void
}) {
  const [base, setBase] = useState(() => {
    const { name, info, tags } = item

    return { name, info, tags }
  })
  const [multiple, setMultiple] = useState(item.multiple)
  const [optionList, setOptionList] = useState(item.optionList)

  function handleChange() {
    const { uuid, user, type } = item
    const update: ItemSelect = {
      uuid,
      user,
      type,
      ...base,
      multiple,
      optionList,
    }

    onChange(update)
  }

  function handleOptionCreate() {
    const uuid = (Math.max(...optionList.map(option => option.uuid)) || 0) + 1

    setOptionList(list => [...list, { uuid, name: '', info: '' }])
  }
  function handleOptionChange(option: ItemSelectOption) {
    setOptionList(list =>
      list.map(item => {
        return item.uuid === option.uuid ? option : item
      }),
    )
  }
  function handleOptionDelete(option: ItemSelectOption) {
    setOptionList(list => list.filter(cursor => cursor !== option))
  }

  const OptionList = optionList.map(option => (
    <MyLifeItemSelectOption
      key={option.uuid}
      option={option}
      onChange={handleOptionChange}
      onDelete={() => handleOptionDelete(option)}
    />
  ))

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">{item.name}</Typography>
        <Button onClick={handleChange}>Update</Button>
      </Stack>
      <MyLifeItemBase item={base} onChange={setBase} />
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Options</Typography>
          <Button onClick={handleOptionCreate}>Add</Button>
        </Stack>
        <Paper variant="outlined">{OptionList}</Paper>
      </Stack>
      <FormControlLabel
        control={
          <Checkbox
            value={multiple}
            onChange={e => setMultiple(e.target.checked)}
          />
        }
        label="Multiple"
      />
    </Stack>
  )
}
