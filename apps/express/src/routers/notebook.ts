import { NotebookDao, NotebookUserDao, NoteDao } from '@my/models'
import { actionBus } from '../action'
import { Mapper } from '../mapper'

actionBus.register('notebook.get', async (notebookId, req) => {
  const notebook = await NotebookDao.find(notebookId)

  if (!notebook) throw new Error()
  if (!notebook.public) {
    const userId = req.getAuth().userId
    const notebookUser = await NotebookUserDao.findByUserByNotebook(
      userId,
      notebookId,
    )

    if (!notebookUser) throw new Error()
  }

  return Mapper.notebook(notebook)
})
actionBus.register('notebook.getByUser', async (userId, req) => {
  if (userId !== req.getAuth().userId) throw new Error()

  return Promise.all(
    (await NotebookUserDao.findByUser(userId)).map(async user => {
      const notebook = await NotebookDao.find(user.notebook)
      if (!notebook) throw new Error()
      return {
        user: Mapper.notebookUser(user),
        notebook: Mapper.notebook(notebook),
      }
    }),
  )
})
actionBus.register('notebook.create', async (notebookCreateDto, req) => {
  const user = await req.getUser()
  const notebook = Mapper.notebook(await NotebookDao.create(notebookCreateDto))
  const notebookUser = Mapper.notebookUser(
    await NotebookUserDao.create({
      notebook: notebook.id,
      user: user.id,
      role: {
        create: true,
        update: true,
        delete: true,
        manage: true,
      },
    }),
  )
  const notebookNote = Mapper.note(
    await NoteDao.create({
      notebook: notebook.id,
      name: 'Note',
      tags: [],
      data: '[{ "type": "paragraph", "children": [{ "text": "Notes" }] }]',
    }),
  )

  return { notebook, notebookUser, notebookNote }
})
actionBus.register('notebook.update', async (notebookUpdateDto, req) => {
  const userId = req.getAuth().userId
  const notebookId = notebookUpdateDto.id
  const notebookUser = await NotebookUserDao.findByUserByNotebook(
    userId,
    notebookId,
  )

  if (!notebookUser) throw new Error()
  if (!notebookUser.role.manage) throw new Error()

  const notebook = await NotebookDao.update(notebookId, notebookUpdateDto)

  if (!notebook) throw new Error()

  return Mapper.notebook(notebook)
})
actionBus.register('notebook.delete', async (notebookId, req) => {
  const userId = req.getAuth().userId
  const notebookUser = await NotebookUserDao.findByUserByNotebook(
    userId,
    notebookId,
  )

  if (!notebookUser) throw new Error()
  if (!notebookUser.role.manage) throw new Error()

  const notebook = await NotebookDao.delete(notebookId)

  if (!notebook) throw new Error()

  return Mapper.notebook(notebook)
})
