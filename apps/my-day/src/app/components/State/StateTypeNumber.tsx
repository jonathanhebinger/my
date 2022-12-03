import { TextField } from '@mui/material'
import { State } from '@my/shared/types'
import { useFormContext } from 'react-hook-form'
import StateTypeNumberControlList from './StateTypeNumberControlList'

export default function StateTypeNumber() {
  const { register } = useFormContext<State>()

  const minProps = register('typeNumber.min', {
    required: true,
    valueAsNumber: true,
  })
  const maxProps = register('typeNumber.max', {
    required: true,
    valueAsNumber: true,
  })
  const stepProps = register('typeNumber.step', {
    required: true,
  })
  const unitProps = register('typeNumber.unit', {
    required: true,
  })

  return (
    <>
      <TextField {...minProps} label="Min" type="number" />
      <TextField {...maxProps} label="Max" type="number" />
      <TextField
        {...stepProps}
        label="Step"
        type="number"
        inputProps={{ step: 1 }}
      />
      <TextField {...unitProps} label="Unit" />
      <StateTypeNumberControlList />
    </>
  )
}
