import { useEffect } from 'react'

export function usePageCloseOrRefresh(callback: () => void) {
  useEffect(() => {
    window.addEventListener('beforeunload', callback)

    return () => window.removeEventListener('beforeunload', callback)
  }, [callback])
}
