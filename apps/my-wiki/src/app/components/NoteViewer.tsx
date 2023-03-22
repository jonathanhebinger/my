import { Chip, Stack } from '@mui/material'
import { NoteDto } from '@my/shared/types'
import useNotebookNoteList from '../hooks/useNoteList'
import RichTextViewer from './Editor/RichTextViewer'

export interface WikiPageViewerProps {
  page: NoteDto
}
export default function WikiPageViewer({ page }: WikiPageViewerProps) {
  const tags = useNotebookNoteList(page.tags).map(tag => (
    <Chip key={tag.id} label={tag.name} variant="outlined" size="small" />
  ))

  return (
    <>
      <Stack direction="row" flexWrap="wrap" spacing={1}>
        {tags}
      </Stack>
      <RichTextViewer text={page.data} />
    </>
  )
}
