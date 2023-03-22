import { NotebookUserDao } from '@my/models'

import { actionBus } from '../action'
import { Mapper } from '../mapper'

actionBus.register('notebook-user.get', async (notebookUserId, req) => {
  const authUserId = req.getAuth().userId
  const notebookUser = await NotebookUserDao.find(notebookUserId)

  if (!notebookUser) throw new Error()
  if (notebookUser.user !== authUserId) {
    const authNotebookUser = await NotebookUserDao.findByUserByNotebook(
      authUserId,
      notebookUser.notebook,
    )

    if (!authNotebookUser) throw new Error()
  }

  return Mapper.notebookUser(notebookUser)
})
actionBus.register(
  'notebook-user.getAllByNotebook',
  async (notebookId, req) => {
    const authUserId = req.getAuth().userId
    const authNotebookUser = await NotebookUserDao.findByUserByNotebook(
      authUserId,
      notebookId,
    )

    if (!authNotebookUser) throw new Error()

    return Mapper.notebookUserList(
      await NotebookUserDao.findByNotebook(notebookId),
    )
  },
)
actionBus.register(
  'notebook-user.create',
  async (notebookUserCreateDto, req) => {
    const userId = req.getAuth().userId
    const notebookUser = await NotebookUserDao.findByUserByNotebook(
      userId,
      notebookUserCreateDto.notebook,
    )

    if (!notebookUser) throw new Error()
    if (!notebookUser.role.manage) throw new Error()

    const note = await NotebookUserDao.create(notebookUserCreateDto)

    return Mapper.notebookUser(note)
  },
)
actionBus.register(
  'notebook-user.update',
  async (notebookUserUpdateDto, req) => {
    const userId = req.getAuth().userId

    if (notebookUserUpdateDto.user !== userId) {
      const authNotebookUser = await NotebookUserDao.findByUserByNotebook(
        userId,
        notebookUserUpdateDto.notebook,
      )

      if (!authNotebookUser) throw new Error()
      if (!authNotebookUser.role.manage) throw new Error()
    }

    const notebookUser = await NotebookUserDao.update(
      notebookUserUpdateDto.id,
      notebookUserUpdateDto,
    )

    if (!notebookUser) throw new Error()

    return Mapper.notebookUser(notebookUser)
  },
)
actionBus.register('notebook-user.delete', async (notebookUserId, req) => {
  const userId = req.getAuth().userId
  const notebookUser = await NotebookUserDao.find(notebookUserId)

  if (!notebookUser) throw new Error()
  if (notebookUser.user !== userId) {
    const authNotebookUser = await NotebookUserDao.findByUserByNotebook(
      userId,
      notebookUser.notebook,
    )

    if (!authNotebookUser) throw new Error()
    if (!authNotebookUser.role.manage) throw new Error()
  }

  const notebookUserDeleted = await NotebookUserDao.delete(notebookUserId)

  if (!notebookUserDeleted) throw new Error()

  return Mapper.notebookUser(notebookUserDeleted)
})
