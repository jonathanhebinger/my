import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { useNotebookContext } from '../hooks/useNotebook'

export default function Wiki() {
  const { notebook } = useNotebookContext()

  return (
    <Stack>
      <TextField
        value={notebook.name}
        onChange={e => {
          console.log(e.target.value)
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            value={notebook.public}
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
