import { useCallback, useMemo, useRef, useState } from 'react'

function getDefault<Item>(
  defaultItems: Item[],
  uuidGetter: (item: Item) => string,
): Record<string, Item> {
  return Object.fromEntries(defaultItems.map(item => [uuidGetter(item), item]))
}

export default function useRecord<Item>(
  defaultItems: Item[],
  uuidGetter: (item: Item) => string,
) {
  const uuidGetterRef = useRef(uuidGetter)

  const [record, setRecord] = useState<Record<string, Item>>(
    getDefault<Item>(defaultItems, uuidGetterRef.current),
  )

  const list = useMemo(() => Object.values(record), [record])

  const upsert = useCallback((item: Item) => {
    setRecord(record => {
      const uuid = uuidGetterRef.current(item)
      return { ...record, [uuid]: item }
    })
  }, [])
  const remove = useCallback((item: Item) => {
    setRecord(record => {
      const uuid = uuidGetterRef.current(item)
      const { [uuid]: deletedItem, ...updatedRecord } = record
      return updatedRecord
    })
  }, [])

  return { record, list, upsert, remove }
}
