/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseInput } from './useInput'

export function useMergeInput<
  InputsMap extends { [index: string]: Omit<UseInput<any, any>, 'props'> },
  StatesMap = {
    [Key in keyof InputsMap]: InputsMap[Key] extends UseInput<infer Value, any>
      ? Value
      : null
  },
  ErrorsMap = {
    [Key in keyof InputsMap]: InputsMap[Key] extends UseInput<any, infer Error>
      ? Error
      : null
  },
>(
  inputsMap: InputsMap,
  onChange?: (value: StatesMap) => void,
): Omit<UseInput<StatesMap, ErrorsMap>, 'props'> {
  const merge = {
    value: {},
    error: {},
    dirty: false,
    valid: true,
  } as Omit<UseInput<StatesMap, ErrorsMap>, 'props'>

  Object.entries(inputsMap).forEach(([key, input]) => {
    ;(merge.value as any)[key] = input.value
    ;(merge.error as any)[key] = input.error
    merge.valid &&= input.valid
    merge.dirty ||= input.dirty
  })

  console.log(inputsMap, merge)

  if (onChange && merge.dirty && merge.valid) onChange(merge.value)

  return merge
}
