import { useMemo } from 'react'
import { WikiPageEntity } from '../types/wiki'
import { useWikiPageDatabase } from './usePageDatabase'

export default function useWikiPageList(list: string[]) {
  const { getMany } = useWikiPageDatabase()

  const pageList = useMemo<WikiPageEntity[]>(
    () => getMany(list),
    [getMany, list],
  )

  return pageList
}
