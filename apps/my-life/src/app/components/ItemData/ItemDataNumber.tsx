import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material'
import { IconButton, Stack, TextField } from '@mui/material'
import { useDateDataContext } from '../../contexts/dateData'
import useDateItemData from '../../hooks/useDateItemData'
import { ItemNumber } from '../../types'

export default function MyLifeItemDataNumber({ item }: { item: ItemNumber }) {
  const { upsert } = useDateDataContext()
  const data = useDateItemData(item)
  const { min, max, step } = item

  function handleChange(data: number) {
    upsert(item, [data])
  }
  function handleInc(weight: number) {
    upsert(item, [data[0] + step * weight])
  }

  return (
    <Stack direction="row" spacing={1}>
      <Stack direction="row">
        <IconButton onClick={() => handleInc(-10)}>
          <KeyboardDoubleArrowLeft />
        </IconButton>
        <IconButton onClick={() => handleInc(-1)}>
          <KeyboardArrowLeft />
        </IconButton>
      </Stack>
      <Stack flexGrow={1}>
        <TextField
          size="small"
          type="number"
          value={data[0]}
          onChange={e => handleChange(+e.target.value)}
          inputProps={{ min, max, step }}
        />
      </Stack>
      <Stack direction="row">
        <IconButton onClick={() => handleInc(1)}>
          <KeyboardArrowRight />
        </IconButton>
        <IconButton onClick={() => handleInc(10)}>
          <KeyboardDoubleArrowRight />
        </IconButton>
      </Stack>
    </Stack>
  )
}
