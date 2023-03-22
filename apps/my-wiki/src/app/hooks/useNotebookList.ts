import { httpExec } from '@my/http'
import { NotebookDto, NotebookUserDto, UserId } from '@my/shared/types'
import constate from 'constate/dist/ts/src'
import { useEffect, useState } from 'react'
import { useUserContext } from './useUser'

export function useNotebookList(userId: UserId) {
  const [userNotebookList, setUserNotebookList] = useState<
    { user: NotebookUserDto; notebook: NotebookDto }[]
  >([])

  useEffect(() => {
    httpExec('notebook.getByUser', userId).then(setUserNotebookList)
  }, [userId])

  return { userNotebookList }
}

export const [UserWikiListProvider, useUserWikiListContext] = constate(() => {
  const { user } = useUserContext()

  return useNotebookList(user.id)
})
