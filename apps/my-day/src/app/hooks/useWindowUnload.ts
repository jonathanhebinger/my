import { useEffect } from 'react'

export type UseWindowUnloadEffect = (event: BeforeUnloadEvent) => void | string

export function useWindowUnload(effect: UseWindowUnloadEffect) {
  useEffect(() => {
    window.addEventListener('beforeunload', effect)

    return () => window.removeEventListener('beforeunload', effect)
  }, [effect])
}
