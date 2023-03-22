import { NoteDto, NoteId } from '@my/shared/types'
import { useMemo } from 'react'
import { useNotebookNoteContext } from './useNote'

export default function useNotebookNoteList(list: NoteId[]) {
  const { getMany } = useNotebookNoteContext()

  const pageList = useMemo<NoteDto[]>(() => getMany(list), [getMany, list])

  return pageList
}
