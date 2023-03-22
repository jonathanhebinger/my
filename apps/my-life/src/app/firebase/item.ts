import {
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  CollectionReference,
  collection,
} from 'firebase/firestore'
import { v4 } from 'uuid'
import { firestore } from '../firebase'
import { Item } from '../types'

export const itemCollectionRef = collection(
  firestore,
  'LifeItem',
) as CollectionReference<Omit<Item, 'uuid'>>

export async function createItem(item: Item) {
  const { uuid, ...data } = item
  await setDoc(doc(itemCollectionRef, uuid), data)
}
export async function updateItem(item: Item) {
  const { uuid, ...data } = item
  await updateDoc(doc(itemCollectionRef, uuid), data)
}
export async function removeItem(item: Item) {
  const { uuid } = item
  await deleteDoc(doc(itemCollectionRef, uuid))
}
export function onItemSnapshot(
  onCreate: (item: Item) => void,
  onUpdate: (item: Item) => void,
  onDelete: (item: Item) => void,
) {
  return onSnapshot(itemCollectionRef, snapshot => {
    snapshot.docChanges().forEach(change => {
      const uuid = change.doc.id
      const data = change.doc.data()
      const item = { ...data, uuid } as Item

      switch (change.type) {
        case 'added':
          return onCreate(item)
        case 'modified':
          return onUpdate(item)
        case 'removed':
          return onDelete(item)
      }
    })
  })
}

export function itemInit(
  user: string,
  type: Item['type'],
  name: string,
  info: string,
): Item {
  const uuid = v4()

  switch (type) {
    case 'number':
      return { uuid, user, name, info, type, tags: [], step: 1, min: 0 }
    case 'select':
      return {
        uuid,
        user,
        name,
        info,
        type,
        tags: [],
        multiple: false,
        optionList: [],
      }
    case 'folder':
      return { uuid, user, name, info, type, tags: [], itemList: [] }
  }
}
