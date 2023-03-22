import { Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import WikiMenu from '../components/Menu'
import WikiPageList from '../components/NoteList'
import { NotebookNoteProvider } from '../hooks/useNote'
import { OpenedNoteListProvider } from '../hooks/useNoteOpenedList'
import { NotebookProvider } from '../hooks/useNotebook'

export default function WikiPage() {
  const { wikiId } = useParams<{ wikiId: string }>()

  if (!wikiId) return null

  return (
    <NotebookProvider notebookId={wikiId}>
      <NotebookNoteProvider>
        <OpenedNoteListProvider>
          <Grid container spacing={2} padding={1}>
            <Grid item xs={8}>
              <WikiPageList />
            </Grid>
            <Grid item xs={4}>
              <WikiMenu />
            </Grid>
          </Grid>
        </OpenedNoteListProvider>
      </NotebookNoteProvider>
    </NotebookProvider>
  )
}
