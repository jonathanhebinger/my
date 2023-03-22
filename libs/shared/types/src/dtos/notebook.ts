import { NotebookEntity } from '../entities'
import { EntityToDto } from '../uuid'
import { NoteDto } from './note'
import { NotebookUserDto } from './notebookUser'

export type NotebookDto = EntityToDto<NotebookEntity>
export type NotebookCreateDtoKeys = 'name' | 'public'
export type NotebookUpdateDtoKeys = 'id' | NotebookCreateDtoKeys
export type NotebookCreateDto = Pick<NotebookDto, NotebookCreateDtoKeys>
export type NotebookCreatedDto = {
  notebook: NotebookDto
  notebookUser: NotebookUserDto
  notebookNote: NoteDto
}
export type NotebookUpdateDto = Pick<NotebookDto, NotebookUpdateDtoKeys>
