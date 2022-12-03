import constate from 'constate'
import { useState } from 'react'
import useWikiPageList from './usePageList'

export const [WikiOpenedPageListProvider, useWikiOpenedPageList] = constate(
  () => {
    const [openedPageUuidList, setOpenedPageUuidList] = useState<string[]>([])
    const openedPageList = useWikiPageList(openedPageUuidList)

    const open = (wikiPageUuid: string) => {
      setOpenedPageUuidList(list => [
        wikiPageUuid,
        ...list.filter(item => item !== wikiPageUuid),
      ])
    }
    const close = (wikiPageUuid: string) => {
      setOpenedPageUuidList(list => list.filter(item => item !== wikiPageUuid))
    }

    return { openedPageList, open, close }
  },
)
