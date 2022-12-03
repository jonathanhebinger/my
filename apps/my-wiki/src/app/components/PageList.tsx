import { Stack } from '@mui/material'
import { useWikiOpenedPageList } from '../hooks/usePageOpenedList'
import WikiPage from './Page'

export default function WikiPageList() {
  const { openedPageList } = useWikiOpenedPageList()

  return (
    <Stack spacing={2}>
      {openedPageList.map(page => (
        <WikiPage key={page.uuid} page={page} />
      ))}
    </Stack>
  )
}
