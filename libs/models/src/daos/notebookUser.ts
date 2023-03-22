import {
  NotebookUserCreateDto,
  NotebookUserEntity as NotebookUser,
  NotebookUserUpdateDto,
  NotebookUserId,
  NotebookId,
  UserId,
} from '@my/shared/types'
import { NotebookUserModel } from '../models'

export interface iNotebookUserDao {
  find(notebookUserId: NotebookUserId): Promise<null | NotebookUser>
  findByUser(userId: UserId): Promise<NotebookUser[]>
  findByUserByNotebook(
    user: UserId,
    notebookId: NotebookId,
  ): Promise<null | NotebookUser>
  findByNotebook(notebookId: NotebookId): Promise<NotebookUser[]>
  exists(notebookUserId: NotebookUserId): Promise<boolean>
  create(notebookUserCreateDto: NotebookUserCreateDto): Promise<NotebookUser>
  update(
    notebookUserId: NotebookUserId,
    notebookUserUpdateDto: NotebookUserUpdateDto,
  ): Promise<null | NotebookUser>
  delete(notebookUserId: NotebookUserId): Promise<null | NotebookUser>
  deleteByUser(userId: UserId): Promise<number>
  deleteByNotebook(notebookId: NotebookId): Promise<number>
}

export const NotebookUserDao: iNotebookUserDao = {
  async exists(notebookUserId) {
    return !!(await this.find(notebookUserId))
  },
  async find(notebookUserId) {
    return await NotebookUserModel.findById(notebookUserId)
  },
  async findByUser(userId) {
    return await NotebookUserModel.find({ user: userId })
  },
  async findByUserByNotebook(user, notebookId) {
    return await NotebookUserModel.findOne({
      user: user,
      notebook: notebookId,
    })
  },
  async findByNotebook(notebookId) {
    return await NotebookUserModel.find({ notebook: notebookId })
  },
  async create(notebookUserCreateDto) {
    return await new NotebookUserModel(notebookUserCreateDto).save()
  },
  async update(notebookUserId, notebookUserCreateDto) {
    return await NotebookUserModel.findByIdAndUpdate(
      notebookUserId,
      notebookUserCreateDto,
    )
  },
  async delete(notebookUserId) {
    return await NotebookUserModel.findByIdAndDelete(notebookUserId)
  },
  async deleteByUser(userId) {
    return (await NotebookUserModel.deleteMany({ user: userId })).deletedCount
  },
  async deleteByNotebook(notebookId) {
    return (await NotebookUserModel.deleteMany({ notebook: notebookId }))
      .deletedCount
  },
}
