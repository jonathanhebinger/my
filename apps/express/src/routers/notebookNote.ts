import { NotebookDao, NotebookUserDao, NoteDao } from '@my/models'

import { actionBus } from '../action'
import { Mapper } from '../mapper'

actionBus.register('notebook-note.getAll', async (notebookId, req) => {
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

  return Mapper.noteList(await NoteDao.findByNotebook(notebookId))
})
actionBus.register('notebook-note.get', async (notebookNoteId, req) => {
  const note = await NoteDao.find(notebookNoteId)

  if (!note) throw new Error()

  const notebook = await NotebookDao.find(note.notebook)

  if (!notebook) throw new Error()
  if (!notebook.public) {
    const userId = req.getAuth().userId
    const notebookUser = await NotebookUserDao.findByUserByNotebook(
      userId,
      notebook.id,
    )

    if (!notebookUser) throw new Error()
  }

  return Mapper.note(note)
})
actionBus.register(
  'notebook-note.create',
  async (notebookNoteCreateDto, req) => {
    const userId = req.getAuth().userId
    const notebookUser = await NotebookUserDao.findByUserByNotebook(
      userId,
      notebookNoteCreateDto.notebook,
    )

    if (!notebookUser) throw new Error()
    if (!notebookUser.role.create) throw new Error()

    const note = await NoteDao.create(notebookNoteCreateDto)

    return Mapper.note(note)
  },
)
actionBus.register(
  'notebook-note.update',
  async (notebookNoteUpdateDto, req) => {
    const userId = req.getAuth().userId
    const notebookUser = await NotebookUserDao.findByUserByNotebook(
      userId,
      notebookNoteUpdateDto.notebook,
    )

    if (!notebookUser) throw new Error()
    if (!notebookUser.role.update) throw new Error()

    const note = await NoteDao.update(
      notebookNoteUpdateDto.id,
      notebookNoteUpdateDto,
    )

    if (!note) throw new Error()

    return Mapper.note(note)
  },
)
actionBus.register('notebook-note.delete', async (notebookNoteId, req) => {
  const note = await NoteDao.find(notebookNoteId)

  if (!note) throw new Error()

  const userId = req.getAuth().userId
  const notebookUser = await NotebookUserDao.findByUserByNotebook(
    userId,
    note.notebook,
  )

  if (!notebookUser) throw new Error()
  if (!notebookUser.role.delete) throw new Error()

  const noteDeleted = await NoteDao.delete(notebookNoteId)

  if (!noteDeleted) throw new Error()

  return Mapper.note(noteDeleted)
})
