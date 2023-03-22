import constate from 'constate'
import { useState } from 'react'
import { Item } from '../types'

export const [ItemContextProvider, useItemContext] = constate(() => {
  const [itemList, setItemList] = useState<Item[]>([])

  const insertItem = (data: Item) => {
    setItemList(dataList => [...dataList, data])
  }
  const upsertItem = (data: Item) => {
    removeItem(data)
    insertItem(data)
  }
  const removeItem = (data: Item) => {
    setItemList(dataList => {
      return dataList.filter(item => item.uuid === data.uuid)
    })
  }

  return { itemList, insertItem, upsertItem, removeItem }
})
