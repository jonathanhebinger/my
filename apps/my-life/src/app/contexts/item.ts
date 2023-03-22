import constate from 'constate'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import {
  createItem,
  onItemSnapshot,
  removeItem,
  updateItem,
} from '../firebase/item'
import useRecord from '../hooks/useRecord'
import { Item } from '../types'

export const [ItemContextProvider, useItemContext] = constate(() => {
  const navigate = useNavigate()
  const { list, record, remove, upsert } = useRecord<Item>(
    [],
    item => item.uuid,
  )

  useEffect(() => {
    return onItemSnapshot(upsert, upsert, remove)
  }, [upsert, remove])

  return {
    itemList: list,
    record,
    createItem,
    updateItem(item: Item) {
      navigate('/item')
      updateItem(item)
    },
    removeItem,
  }
})
