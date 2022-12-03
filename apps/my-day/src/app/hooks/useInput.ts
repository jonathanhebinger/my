/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { useState } from 'react'

type InputEvt = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type InputError = { [index: string]: boolean | string }
type InputValidator<
  Value extends string | number,
  ErrorPart extends InputError,
> = (value: Value, initialValue: Value) => void | ErrorPart
type InputErrorPartExtractor<
  Fun extends InputValidator<Val, InputError>,
  Val extends string | number,
> = Fun extends InputValidator<Val, infer StatePart> ? StatePart : {}
type InputErrorPartsExtractor<
  InputFunList extends InputValidator<InputVal, InputError>[],
  InputVal extends string | number,
> = {
  [Key in keyof InputFunList]: InputErrorPartExtractor<
    InputFunList[Key],
    InputVal
  >
}
type InputErrorMerge<Array extends object[]> = Array extends [
  infer A,
  ...infer B,
]
  ? A extends object
    ? A & (B extends object[] ? InputErrorMerge<B> : {})
    : {}
  : {}

export type UseInput<Value, Error> = {
  value: Value
  valid: boolean
  dirty: boolean
  error: Error
  props: {
    value: Value
    onChange: (e: InputEvt) => void
  }
}
export function useInput<
  Value extends string | number,
  Validators extends InputValidator<Value, InputError>[],
  Error extends InputError = InputErrorMerge<
    InputErrorPartsExtractor<Validators, Value>
  >,
>(initialValue: Value, ...validators: Validators): UseInput<Value, Error> {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState(() => {
    return getError(value, initialValue, validators) as Error
  })
  const [dirty, setDirty] = useState(false)
  const [valid, setValid] = useState(getValid(error))

  const handleChange = (e: InputEvt) => {
    const value = getValue(initialValue, e)
    const error = getError(value, initialValue, validators) as Error

    setValue(value)
    setDirty(value !== initialValue)
    setError(error)
    setValid(getValid(error))
  }

  return {
    value,
    valid,
    dirty,
    error,
    props: { value, onChange: handleChange },
  }
}

function getValue<Value extends string | number>(
  initialValue: Value,
  e: InputEvt,
) {
  const isNumber = typeof initialValue === 'number'

  return (isNumber ? Number(e.target.value) : e.target.value) as Value
}
function getError<Value extends string | number>(
  value: Value,
  initialValue: Value,
  validators: InputValidator<Value, InputError>[],
): InputError {
  const error = {} as InputError

  validators.forEach(fn => Object.assign(error, fn(value, initialValue)))

  return error
}
function getValid(error: InputError) {
  return Object.values(error).every(value => !value)
}
