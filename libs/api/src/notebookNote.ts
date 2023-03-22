import {
  Action,
  NotebookId,
  NoteCreateDto,
  NoteDto,
  NoteId,
  NoteUpdateDto,
} from '@my/shared/types'

export type NotebookNoteAction =
  | Action<'notebook-note.get', NoteId, NoteDto>
  | Action<'notebook-note.getAll', NotebookId, NoteDto[]>
  | Action<'notebook-note.create', NoteCreateDto, NoteDto>
  | Action<'notebook-note.update', NoteUpdateDto, NoteDto>
  | Action<'notebook-note.delete', NoteId, NoteDto>
