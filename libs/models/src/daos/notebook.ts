import {
  NotebookCreateDto,
  NotebookEntity,
  NotebookUpdateDto,
  NotebookId,
} from '@my/shared/types'
import { NotebookModel } from '../models'

export interface iNotebookDao {
  exists(notebookId: NotebookId): Promise<boolean>
  isPublic(notebookId: NotebookId): Promise<boolean>
  find(notebookId: NotebookId): Promise<null | NotebookEntity>
  create(notebookCreateDto: NotebookCreateDto): Promise<NotebookEntity>
  update(
    notebookId: NotebookId,
    notebookUpdateDto: NotebookUpdateDto,
  ): Promise<null | NotebookEntity>
  delete(notebookId: NotebookId): Promise<null | NotebookEntity>
}

export const NotebookDao: iNotebookDao = {
  async exists(notebookId) {
    return !!(await this.find(notebookId))
  },
  async isPublic(notebookId) {
    return (await this.find(notebookId))?.public || false
  },
  async find(notebookId) {
    return await NotebookModel.findById(notebookId)
  },
  async create(notebookCreateDto) {
    return await new NotebookModel(notebookCreateDto).save()
  },
  async update(notebookId, notebookUpdateDto) {
    return await NotebookModel.findByIdAndUpdate(notebookId, notebookUpdateDto)
  },
  async delete(notebookId) {
    return await NotebookModel.findByIdAndDelete(notebookId)
  },
}
