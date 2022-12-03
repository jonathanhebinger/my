import { firestore } from '@my/shared/firebase'
import constate from 'constate'
import {
  deleteDoc,
  enableIndexedDbPersistence,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import produce from 'immer'
import { remove } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { WikiPageEntity } from '../types/wiki'
import { findOrFailByUuid } from '../util'
import { Wiki } from '../utils/wiki'
import { useWiki } from './useWiki'

export const SYSTEM = {
  TAG: 'system.tag',
}
export const DEFAULT_PAGES: WikiPageEntity[] = [
  {
    ...Wiki.Page.createEntity(),
    uuid: SYSTEM.TAG,
    name: 'tag',
    tags: [SYSTEM.TAG],
  },
]

enableIndexedDbPersistence(firestore).catch(err => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code === 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
})

export const [WikiPageDatabaseProvider, useWikiPageDatabase] = constate(() => {
  const wiki = useWiki()
  const [database, setDatabase] = useState<WikiPageEntity[]>(DEFAULT_PAGES)
  const [lastSync, setLastSync] = useState(0)

  /*
  /// Should use indexedDB instead

  const [database, setDatabase] = useLocalStorage<WikiPageEntity[]>(
    `wiki/${wiki.uuid}/database`,
    DEFAULT_PAGES,
  )
  const [lastSync, setLastSync] = useLocalStorage(
    `wiki/${wiki.uuid}/lastSync`,
    0,
  )
  */

  const tags = useMemo(
    () => database.filter(page => page.tags.includes(SYSTEM.TAG)),
    [database],
  )

  // sync database
  useEffect(() => {
    return onSnapshot(
      query(
        Wiki.Page.getCollectionRef(wiki.uuid),
        where('updateDate', '>=', lastSync),
      ),
      querySnapshot => {
        setDatabase(
          produce(database => {
            querySnapshot.docChanges().forEach(({ type, doc }) => {
              const wikiPage = { uuid: doc.id, ...doc.data() }

              switch (type) {
                case 'added': {
                  remove(database, page => page.uuid === wikiPage.uuid)

                  database.push(wikiPage)

                  break
                }
                case 'modified': {
                  const page = findOrFailByUuid(database, wikiPage.uuid)

                  Object.assign(page, wikiPage)

                  break
                }
                case 'removed': {
                  remove(database, page => page.uuid === wikiPage.uuid)

                  break
                }
              }

              setLastSync(lastSync => Math.max(lastSync, wikiPage.updateDate))
            })

            return database
          }),
        )
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wiki.uuid])

  function getOne(pageUuid: string) {
    return findOrFailByUuid(database, pageUuid)
  }
  function getMany(pageUuidList: string[]) {
    return pageUuidList.map(getOne)
  }
  function setOne(
    wikiPage: WikiPageEntity,
    callback?: (page: WikiPageEntity) => void,
  ) {
    const { uuid, ...data } = wikiPage

    data.updateDate = Date.now()

    setDoc(Wiki.Page.getDocumentRef(wiki.uuid, uuid), data).then(() => {
      callback && callback(wikiPage)
    })
  }

  return {
    database,
    tags,
    getOne,
    getMany,
    setOne,
    create(callback?: (page: WikiPageEntity) => void) {
      const page = Wiki.Page.createEntity()

      setOne(page, callback)
    },
    update(pageUpdate: WikiPageEntity) {
      setOne(
        produce(pageUpdate, page => {
          page.updateDate = Date.now()
        }),
      )
    },
    delete(pageUuid: string) {
      deleteDoc(Wiki.Page.getDocumentRef(wiki.uuid, pageUuid))
    },
  }
})
