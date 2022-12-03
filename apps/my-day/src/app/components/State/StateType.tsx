import { MenuItem, TextField, Typography } from '@mui/material'
import { State } from '@my/shared/types'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import StateTypeNumber from './StateTypeNumber'

export default function StateType() {
  const { register, watch } = useFormContext<State>()

  const type = useMemo(() => watch('type'), [watch])
  const typeProps = register('type', {
    required: true,
  })

  return (
    <>
      <Typography>Type</Typography>
      <TextField {...typeProps} select label="Type" defaultValue={type}>
        <MenuItem value="number">Number</MenuItem>
        <MenuItem value="choice">Choice</MenuItem>
      </TextField>
      {type === 'number' ? <StateTypeNumber /> : null}
      {type === 'choice' ? <StateTypeNumber /> : null}
    </>
  )
}
