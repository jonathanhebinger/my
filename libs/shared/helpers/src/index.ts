export function isDefined<Value>(value: Value | undefined): value is Value {
  return value !== undefined && value !== null
}
export function assertDefined<Value>(value: Value | undefined): Value {
  if (isDefined(value)) return value

  throw new Error()
}
