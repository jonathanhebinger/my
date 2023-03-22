import constate from 'constate'
import { useMemo, useState } from 'react'

const DAY = 24 * 60 * 60 * 1000
const DAY_INV = 1 / DAY

export const [DateContextProvider, useDateContext] = constate(() => {
  const [date, setDate] = useState(() => {
    return Math.floor(Date.now() * DAY_INV)
  })
  const dateString = useMemo(() => {
    return new Date(date * DAY).toLocaleDateString()
  }, [date])

  const dec7 = () => setDate(date - 7)
  const dec1 = () => setDate(date - 1)
  const inc1 = () => setDate(date + 1)
  const inc7 = () => setDate(date + 7)

  return { date, dateString, dec7, dec1, inc1, inc7 }
})
