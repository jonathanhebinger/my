import usePrevious from './usePrevious'

export default function useModified<Value>(value: Value) {
  return usePrevious(value) !== value
}
