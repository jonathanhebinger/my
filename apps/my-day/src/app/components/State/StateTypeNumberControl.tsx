import {
  Button,
  TableCell,
  TableRow,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { State } from '@my/shared/types'
import { ChangeEvent, forwardRef, useState } from 'react'
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form'

export type StateTypeNumberControlProps = {
  index: number
  remove: UseFieldArrayRemove
}
export default function StateTypeNumberControl({
  index,
  remove,
}: StateTypeNumberControlProps) {
  const { register } = useFormContext<State>()

  const nameProps = register(`typeNumber.controls.${index}.name`)
  const iconProps = register(`typeNumber.controls.${index}.icon`, {
    required: true,
  })
  const colorProps = register(`typeNumber.controls.${index}.color`, {
    required: true,
    valueAsNumber: true,
  })
  const positionProps = register(`typeNumber.controls.${index}.position`)

  return (
    <TableRow>
      <TableCell>
        <MyInput {...nameProps} />
      </TableCell>
      <TableCell>
        <MyInput type="number" {...positionProps} />
      </TableCell>
      <TableCell>
        <Button onClick={() => remove(index)}>Delete</Button>
      </TableCell>
    </TableRow>
  )
}

export const MyInput = forwardRef((props: TextFieldProps, ref: any) => {
  return <TextField ref={ref} fullWidth variant="standard" {...props} />
})

export function useMyInput<
  Value extends string | number,
  Props extends TextFieldProps,
  Validators extends any[],
>(initialValue: Value, props: Props, validators: Validators) {
  const [value, setValue] = useState(initialValue)

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    props.onChange && props.onChange(e)

    const value = (
      props.type === 'number' ? Number(e.target.value) : e.target.value
    ) as Value

    setValue(value)
  }

  return [value, <MyInput {...props} onChange={onChange} />]
}
