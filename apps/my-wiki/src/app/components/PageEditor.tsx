import { TextField } from '@mui/material'
import produce from 'immer'
import { SYSTEM } from '../hooks/usePageDatabase'
import { WikiPageEntity } from '../types/wiki'
import RichTextEditor from './Editor/RichTextEditor'
import PageSelector from './PageSelector'

export interface WikiPageEditorProps {
  page: WikiPageEntity
  onUpdate: (page: WikiPageEntity) => void
}
export default function WikiPageEditor({
  page,
  onUpdate,
}: WikiPageEditorProps) {
  function updateDraft(updater: (page: WikiPageEntity) => void) {
    onUpdate(produce(page, updater))
  }

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
        disabled={item => {
          return page.uuid === SYSTEM.TAG && item.uuid === SYSTEM.TAG
        }}
        onSelect={pageList => {
          updateDraft(page => {
            page.tags = pageList.map(({ uuid }) => uuid)
          })
        }}
      />
      <RichTextEditor
        text={page.data}
        onChange={value => {
          updateDraft(draft => {
            draft.data = value
          })
        }}
      />
    </>
  )
}
