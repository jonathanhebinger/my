import { Button, Checkbox, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Item, ItemNumber } from '../../types'
import MyLifeItemBase from './ItemBase'

export default function MyLifeItemNumber({
  item,
  onChange,
}: {
  item: ItemNumber
  onChange: (item: Item) => void
}) {
  const [base, setBase] = useState(() => {
    const { name, info, tags } = item

    return { name, info, tags }
  })
  const [withMin, setWithMin] = useState(item.min !== undefined)
  const [withMax, setWithMax] = useState(item.max !== undefined)
  const [min, setMin] = useState(item.min || 0)
  const [max, setMax] = useState(item.max || (item.min || 0) + 1)
  const [step, setStep] = useState(item.step)

  function handleChange() {
    const { uuid, user, type } = item
    const update: ItemNumber = { uuid, user, type, ...base, step }

    if (withMin) update.min = withMax ? Math.min(min, max) : min
    if (withMax) update.max = withMin ? Math.min(min, max) : max

    onChange(update)
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">{item.name}</Typography>
        <Button onClick={handleChange}>Update</Button>
      </Stack>
      <MyLifeItemBase item={base} onChange={setBase} />
      <Stack direction="row">
        <TextField
          fullWidth
          disabled={!withMin}
          size="small"
          type="number"
          label="Min"
          value={withMin ? min : ''}
          onChange={e => setMin(+e.target.value)}
        />
        <Checkbox
          checked={withMin}
          onChange={e => setWithMin(e.target.checked)}
        />
      </Stack>
      <Stack direction="row">
        <TextField
          fullWidth
          disabled={!withMax}
          size="small"
          type="number"
          label="Max"
          value={withMax ? max : ''}
          onChange={e => setMax(+e.target.value)}
        />
        <Checkbox
          checked={withMax}
          onChange={e => setWithMax(e.target.checked)}
        />
      </Stack>
      <TextField
        size="small"
        type="number"
        label="Step"
        value={step}
        onChange={e => setStep(+e.target.value)}
      />
    </Stack>
  )
}
