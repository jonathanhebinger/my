import {
  NotebookId,
  NoteCreateDto,
  NoteEntity,
  NoteId,
  NoteUpdateDto,
} from '@my/shared/types'

import { NoteModel } from '../models'

export interface iNoteDao {
  find(noteId: NoteId): Promise<null | NoteEntity>
  findAll(): Promise<NoteEntity[]>
  findByNotebook(
    notebookId: NotebookId,
    updatedAt?: number,
  ): Promise<NoteEntity[]>
  create(noteCreateDto: NoteCreateDto): Promise<NoteEntity>
  update(
    noteId: NoteId,
    noteUpdateDto: NoteUpdateDto,
  ): Promise<null | NoteEntity>
  delete(noteId: NoteId): Promise<null | NoteEntity>
  deleteByNotebook(notebookId: NotebookId): Promise<number>
}

export const NoteDao: iNoteDao = {
  async find(noteId) {
    return await NoteModel.findById(noteId)
  },
  async findAll() {
    return await NoteModel.find()
  },
  async findByNotebook(notebookId, updatedAt = 0) {
    return await NoteModel.find({
      notebook: notebookId,
      updatedAt: { $gt: new Date(updatedAt) },
    })
  },
  async create(noteCreateDto) {
    return await new NoteModel(noteCreateDto).save()
  },
  async update(noteId, noteUpdateDto) {
    return await NoteModel.findByIdAndUpdate(noteId, noteUpdateDto)
  },
  async delete(noteId) {
    return await NoteModel.findByIdAndDelete(noteId)
  },
  async deleteByNotebook(notebookId) {
    return (await NoteModel.deleteMany({ notebook: notebookId })).deletedCount
  },
}
