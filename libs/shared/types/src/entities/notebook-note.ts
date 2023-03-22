import { Entity, Id } from '../uuid'
import { NotebookId } from './notebook'

export type NotebookNote = 'notebook--note'
export type NotebookNoteId = Id<NotebookNote>
export type NotebookNoteEntity = Entity<NotebookNote, true> & {
  notebook: NotebookId
  name: string
  tags: NotebookNoteId[]
  data: string
}
