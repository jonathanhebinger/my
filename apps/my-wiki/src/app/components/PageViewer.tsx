import { Chip, Stack } from '@mui/material'
import useWikiPageList from '../hooks/usePageList'
import { WikiPageEntity } from '../types/wiki'
import RichTextViewer from './Editor/RichTextViewer'

export interface WikiPageViewerProps {
  page: WikiPageEntity
}
export default function WikiPageViewer({ page }: WikiPageViewerProps) {
  const tags = useWikiPageList(page.tags).map(tag => (
    <Chip key={tag.uuid} label={tag.name} variant="outlined" size="small" />
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
