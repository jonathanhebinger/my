import { firestore } from '@my/shared/firebase'
import {
  CollectionReference,
  collection,
  DocumentReference,
  doc,
  getDoc,
  setDoc,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { v4 } from 'uuid'
import {
  WikiDTO,
  WikiEntity,
  WikiPageDTO,
  WikiPageEntity,
  WikiUserDTO,
  WikiUserEntity,
} from '../types/wiki'

export const Wiki = {
  PATH: 'wiki',
  getCollectionRef(): CollectionReference<WikiDTO> {
    return collection(firestore, Wiki.PATH) as CollectionReference<WikiDTO>
  },
  getDocumentRef(wikiUuid?: string): DocumentReference<WikiDTO> {
    return doc(Wiki.getCollectionRef(), wikiUuid)
  },
  async getOne(wikiUuid: string): Promise<WikiEntity> {
    const snapshot = await getDoc(Wiki.getDocumentRef(wikiUuid))

    if (!snapshot.exists()) throw new Error()

    return { uuid: snapshot.id, ...snapshot.data() }
  },
  async setOne(wiki: WikiEntity): Promise<void> {
    const { uuid, ...data } = wiki

    await setDoc(Wiki.getDocumentRef(uuid), data)
  },
  User: {
    PATH: 'user',
    getCollectionRef(wikiUuid: string): CollectionReference<WikiUserDTO> {
      return collection(
        Wiki.getCollectionRef(),
        wikiUuid,
        Wiki.User.PATH,
      ) as CollectionReference<WikiUserDTO>
    },
    getDocumentRef(
      wikiUuid: string,
      wikiUserUuid?: string,
    ): DocumentReference<WikiUserDTO> {
      return doc(Wiki.User.getCollectionRef(wikiUuid), wikiUserUuid)
    },
    createEntity(user: string, name: string, role: string[]): WikiUserEntity {
      return { uuid: '', user, name, role }
    },
    snapshotToEntity(
      document: QueryDocumentSnapshot<WikiUserDTO>,
    ): WikiUserEntity {
      return { uuid: document.id, ...document.data() }
    },
  },
  Page: {
    PATH: 'page',
    getCollectionRef(wikiUuid: string): CollectionReference<WikiPageDTO> {
      return collection(
        Wiki.getCollectionRef(),
        wikiUuid,
        Wiki.Page.PATH,
      ) as CollectionReference<WikiPageDTO>
    },
    getDocumentRef(
      wikiUuid: string,
      wikiPageUuid?: string,
    ): DocumentReference<WikiPageDTO> {
      return doc(Wiki.Page.getCollectionRef(wikiUuid), wikiPageUuid)
    },
    createEntity(): WikiPageEntity {
      return {
        uuid: v4(),
        name: 'New Page',
        tag: false,
        tags: [],
        chunks: [],
        data: '',
        createDate: 0,
        updateDate: Date.now(),
      }
    },
    snapshotToEntity(
      document: QueryDocumentSnapshot<WikiPageDTO>,
    ): WikiPageEntity {
      return { uuid: document.id, ...document.data() }
    },
  },
}
