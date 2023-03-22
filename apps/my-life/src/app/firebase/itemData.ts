import {
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  CollectionReference,
  collection,
} from 'firebase/firestore'
import { firestore } from '../firebase'
import { Data } from '../types'

export const itemCollectionRef = collection(
  firestore,
  'LifeDate',
) as CollectionReference<Omit<Data, 'uuid'>>

export async function createDateData(item: Data) {
  const { uuid, ...data } = item
  await setDoc(doc(itemCollectionRef), data)
}
export async function updateDateData(item: Data) {
  const { uuid, ...data } = item
  await updateDoc(doc(itemCollectionRef, uuid), data)
}
export async function removeDateData(item: Data) {
  const { uuid } = item
  await deleteDoc(doc(itemCollectionRef, uuid))
}
export function onDateDataSnapshot(
  onCreate: (item: Data) => void,
  onUpdate: (item: Data) => void,
  onDelete: (item: Data) => void,
) {
  return onSnapshot(itemCollectionRef, snapshot => {
    snapshot.docChanges().forEach(change => {
      const uuid = change.doc.id
      const data = change.doc.data()
      const item = { ...data, uuid } as Data

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
