import { useRef } from 'react'

export function useRefreshCount(message = '') {
  const ref = useRef(0)

  ref.current++

  console.log(message, ref.current)
}
