import constate from 'constate/dist/ts/src'
import produce from 'immer'
import { remove } from 'lodash'
import { useEffect, useState } from 'react'

import { NoteDto, NoteId, Id } from '@my/shared/types'

import { findOrFailById } from '../util'
import { useNotebookContext } from './useNotebook'
import { httpExec } from '@my/http'

export const [NotebookNoteProvider, useNotebookNoteContext] = constate(() => {
  const { notebook } = useNotebookContext()
  const [noteList, setNoteList] = useState<NoteDto[]>([])
  // const [lastSync, setLastSync] = useState(0)

  useEffect(() => {
    httpExec('notebook-note.getAll', notebook.id).then(setNoteList)
  }, [notebook.id])

  function getOne(pageId: Id) {
    return findOrFailById(noteList, pageId)
  }
  function getMany(pageIdList: Id[]) {
    return pageIdList.map(getOne)
  }
  function noteUpsert(note: NoteDto) {
    noteRemove(note)
    setNoteList(list => [...list, note])

    return note
  }
  function noteRemove(note: NoteDto) {
    setNoteList(
      produce(list => {
        remove(list, item => item.id === note.id)
      }),
    )
  }

  return {
    database: noteList,
    getOne,
    getMany,
    create(callback?: (page: NoteDto) => void) {
      httpExec('notebook-note.create', {
        notebook: notebook.id,
        name: '',
        data: '',
        tags: [],
      })
        .then(noteUpsert)
        .then(callback)
    },
    update(note: NoteDto) {
      httpExec('notebook-note.update', note).then(noteUpsert)
    },
    remove(noteId: NoteId) {
      httpExec('notebook-note.delete', noteId).then(noteRemove)
    },
  }
})
