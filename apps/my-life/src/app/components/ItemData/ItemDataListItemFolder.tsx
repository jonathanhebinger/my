import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import useItemList from '../../hooks/useItemList'
import { ItemFolder } from '../../types'
import MyLifeItemDataList from './ItemDataList'

export interface MyLifeItemDataListItemFolderProps {
  item: ItemFolder
  level: number
}
export default function MyLifeItemDataListItemFolder({
  item,
  level,
}: MyLifeItemDataListItemFolderProps) {
  const [opened, setOpened] = useState(level <= 1)

  const itemList = useItemList(item.itemList)

  return (
    <Paper elevation={level * 2 + 1} sx={{ p: 1 }}>
      <Stack spacing={1}>
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          spacing={1}
          onClick={() => setOpened(!opened)}
          sx={{ cursor: 'pointer' }}
        >
          {opened ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
          <Stack direction="row" justifyContent="space-between" flexGrow={1}>
            <Typography>{item.name}</Typography>
            <Typography paddingRight={1}>{itemList.length}</Typography>
          </Stack>
        </Stack>
        {opened && (
          <Box paddingLeft={3.5}>
            <MyLifeItemDataList itemList={itemList} level={level + 1} />
          </Box>
        )}
      </Stack>
    </Paper>
  )
}
