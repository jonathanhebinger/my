import {
  Button,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { ItemSelectOption } from '../../types'

export type MyLifeItemSelectOptionProps = {
  option: ItemSelectOption
  onChange: (item: ItemSelectOption) => void
  onDelete: () => void
}
export function MyLifeItemSelectOption({
  onChange,
  onDelete,
  option,
}: MyLifeItemSelectOptionProps) {
  const [edit, setEdit] = useState(false)

  const { uuid } = option
  const [name, setName] = useState(option.name)
  const [info, setInfo] = useState(option.info)

  const changed = name !== option.name || info !== option.info

  function handleChange() {
    changed && onChange({ uuid, name, info })
    setEdit(false)
  }

  function handleBack() {
    setEdit(false)
    setName(option.name)
    setInfo(option.info)
  }

  const Body = (
    <Stack padding={2} spacing={2}>
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
    </Stack>
  )

  return (
    <Card variant="outlined">
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ px: 2, py: 1 }}>{option.name}</Typography>
          <Stack direction="row">
            {edit && (
              <Button onClick={onDelete} color="warning">
                Delete
              </Button>
            )}
            {edit && <Button onClick={handleBack}>Cancel</Button>}
            {edit && <Button onClick={handleChange}>Save</Button>}
            {!edit && <Button onClick={() => setEdit(true)}>Edit</Button>}
          </Stack>
        </Stack>
        {edit && <Divider />}
        {edit && Body}
      </Stack>
    </Card>
  )
}
