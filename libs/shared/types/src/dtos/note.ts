import { NotebookNoteEntity } from '../entities'
import { EntityToDto } from '../uuid'

export type NoteDto = EntityToDto<NotebookNoteEntity>
export type NoteCreateDtoKeys = 'notebook' | 'name' | 'tags' | 'data'
export type NoteUpdateDtoKeys = 'id' | NoteCreateDtoKeys
export type NoteCreateDto = Pick<NoteDto, NoteCreateDtoKeys>
export type NoteUpdateDto = Pick<NoteDto, NoteUpdateDtoKeys>
