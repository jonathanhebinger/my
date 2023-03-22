import { httpExec } from '@my/http'
import { NotebookDto, NotebookId } from '@my/shared/types'
import constate from 'constate/dist/ts/src'
import { useEffect, useState } from 'react'

export function useNotebook(notebookId: NotebookId) {
  const [notebook, setNotebook] = useState<NotebookDto>({
    id: notebookId,
    name: '',
    public: false,
    createdAt: 0,
    updatedAt: 0,
  })

  useEffect(() => {
    httpExec('notebook.get', notebookId).then(setNotebook)
  }, [notebookId])

  async function notebookUpdate(notebook: NotebookDto) {
    await httpExec('notebook.update', notebook).then(setNotebook)
  }

  return { notebook, notebookUpdate }
}

export const [NotebookProvider, useNotebookContext] = constate(
  ({ notebookId }: { notebookId: string }) => {
    return useNotebook(notebookId)
  },
)
