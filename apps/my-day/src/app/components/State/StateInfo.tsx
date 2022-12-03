import { TextField, Typography } from '@mui/material'
import { State } from '@my/shared/types'
import { useFormContext } from 'react-hook-form'

export default function StateInfo() {
  const { register } = useFormContext<State>()

  const nameProps = register('name', {
    required: true,
    maxLength: 64,
  })
  const infoProps = register('info', {
    required: true,
    maxLength: 256,
  })

  return (
    <>
      <Typography>Info</Typography>
      <TextField label="Name" fullWidth {...nameProps} />
      <TextField label="Info" fullWidth {...infoProps} />
    </>
  )
}
