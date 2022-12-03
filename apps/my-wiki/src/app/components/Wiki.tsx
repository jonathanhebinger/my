import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { useWiki } from '../hooks/useWiki'

export default function Wiki() {
  const wiki = useWiki()

  return (
    <Stack>
      <TextField
        value={wiki.name}
        onChange={e => {
          console.log(e.target.value)
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            value={wiki.public}
            onChange={e => {
              console.log(e.target.checked)
            }}
          />
        }
        label="Public"
      />
    </Stack>
  )
}
