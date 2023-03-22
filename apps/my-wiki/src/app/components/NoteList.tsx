import { Stack } from '@mui/material'
import { useOpenedNoteList } from '../hooks/useNoteOpenedList'
import WikiPage from './Note'

export default function WikiPageList() {
  const { openedPageList } = useOpenedNoteList()

  return (
    <Stack spacing={2}>
      {openedPageList.map(page => (
        <WikiPage key={page.id} page={page} />
      ))}
    </Stack>
  )
}
