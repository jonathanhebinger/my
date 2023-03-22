import { Stack } from '@mui/material'
import { Item, ItemFolder } from '../../types'
import MyLifeItemDataListItem from './ItemDataListItem'
import MyLifeItemDataListItemFolder from './ItemDataListItemFolder'

export interface MyLifeItemDataListProps {
  itemList: Item[]
  level?: number
}
export default function MyLifeItemDataList({
  itemList,
  level = 0,
}: MyLifeItemDataListProps) {
  const itemListFiltered = itemList.filter(item => {
    return !itemList.some(some => {
      return some.type === 'folder' && some.itemList.includes(item.uuid)
    })
  })

  const folderList = itemListFiltered.filter(item => {
    return item.type === 'folder'
  }) as ItemFolder[]
  const othersList = itemListFiltered.filter(item => item.type !== 'folder')

  const FolderList = folderList.map(folder => (
    <MyLifeItemDataListItemFolder
      key={folder.uuid}
      item={folder}
      level={level}
    />
  ))
  const OthersList = othersList.map(item => (
    <MyLifeItemDataListItem key={item.uuid} item={item} />
  ))

  return (
    <Stack spacing={1}>
      {FolderList}
      {OthersList}
    </Stack>
  )
}
