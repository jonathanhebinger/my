import { NoteId } from '@my/shared/types'
import constate from 'constate/dist/ts/src'
import { useState } from 'react'
import useNotebookNoteList from './useNoteList'

export const [OpenedNoteListProvider, useOpenedNoteList] = constate(() => {
  const [openedPageIdList, setOpenedPageIdList] = useState<NoteId[]>([])
  const openedPageList = useNotebookNoteList(openedPageIdList)

  const open = (wikiPageId: NoteId) => {
    setOpenedPageIdList(list => [
      wikiPageId,
      ...list.filter(item => item !== wikiPageId),
    ])
  }
  const close = (wikiPageId: NoteId) => {
    setOpenedPageIdList(list => list.filter(item => item !== wikiPageId))
  }

  return { openedPageList, open, close }
})
