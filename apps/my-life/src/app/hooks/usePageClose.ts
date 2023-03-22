import { useEffect } from 'react'

export function usePageCloseOrRefresh(callback: () => void) {
  useEffect(() => {
    window.addEventListener('unload', callback)

    return () => window.removeEventListener('unload', callback)
  }, [callback])
}
