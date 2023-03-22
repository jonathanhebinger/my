import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { Stack } from '@mui/system'
import { useState } from 'react'
import { itemInit } from '../../firebase/item'
import useUserUuid from '../../hooks/useUserUuid'
import { Item } from '../../types'

export interface MyLifeItemCreateProps {
  onCreate: (item: Item) => void
}
export default function MyLifeItemCreate({ onCreate }: MyLifeItemCreateProps) {
  const user = useUserUuid()
  const [name, setName] = useState('')
  const [info, setInfo] = useState('')
  const [type, setType] = useState<Item['type']>('number')

  function handleTypeChange(event: SelectChangeEvent) {
    setType(event.target.value as Item['type'])
  }
  function handleCreate() {
    if (name.length < 3) return

    onCreate(itemInit(user, type, name, info))
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">New Item</Typography>
        <Button onClick={handleCreate}>Create</Button>
      </Stack>
      <TextField
        size="small"
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        size="small"
        label="Info"
        value={info}
        onChange={e => setInfo(e.target.value)}
      />
      <FormControl fullWidth size="small">
        <InputLabel>Type</InputLabel>
        <Select value={type} label="Type" onChange={handleTypeChange}>
          <MenuItem value={'number'}>Number</MenuItem>
          <MenuItem value={'select'}>Select</MenuItem>
          <MenuItem value={'folder'}>Folder</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  )
}
