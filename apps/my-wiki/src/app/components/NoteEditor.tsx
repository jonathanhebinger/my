import { TextField } from '@mui/material'
import { NoteDto } from '@my/shared/types'
import produce from 'immer'
import { useState } from 'react'
import RichTextEditor from './Editor/RichTextEditor'
import PageSelector from './NoteSelector'

export interface WikiPageEditorProps {
  page: NoteDto
  onUpdate: (page: NoteDto) => void
}
export default function WikiPageEditor({
  page,
  onUpdate,
}: WikiPageEditorProps) {
  function updateDraft(updater: (page: NoteDto) => void) {
    onUpdate(produce(page, updater))
  }

  const [data, setData] = useState(page.data)

  return (
    <>
      <TextField
        label="Name"
        fullWidth
        value={page.name}
        onChange={e => {
          updateDraft(draft => {
            draft.name = e.target.value
          })
        }}
      />
      <PageSelector
        label="Tags"
        multiple
        selected={page.tags}
        onSelect={pageList => {
          updateDraft(page => {
            page.tags = pageList.map(({ id }) => id)
          })
        }}
      />
      <RichTextEditor
        text={page.data}
        onChange={value => {
          updateDraft(draft => {
            draft.data = value
            setData(value)
          })
        }}
      />
      {data}
    </>
  )
}
