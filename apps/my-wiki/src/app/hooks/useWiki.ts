import constate from 'constate'
import { useEffect, useState } from 'react'
import { WikiEntity } from '../types/wiki'
import { Wiki } from '../utils/wiki'

export const [WikiProvider, useWiki] = constate(
  ({ wikiUuid: uuid }: { wikiUuid: string }) => {
    const [wiki, setWiki] = useState<WikiEntity>({
      uuid,
      name: '',
      public: false,
    })

    useEffect(() => {
      setWiki(wiki => ({ ...wiki, uuid }))

      Wiki.getOne(uuid).then(setWiki)
    }, [uuid])

    return wiki
  },
)
