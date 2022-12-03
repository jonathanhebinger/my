import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
} from 'firebase/firestore'
import { LogDay, State, User } from '@my/shared/types'
import { firestore } from './firebase'

export const COLLECTION = {
  USER: 'user',
  STATE: 'state',
  LOG_DAY: 'log_day',
}

export function getUserCollection() {
  return collection(firestore, COLLECTION.USER) as CollectionReference<User>
}
export function getUserRef(userUuid?: string) {
  return doc(getUserCollection(), userUuid) as DocumentReference<User>
}

export function getUserLogDayCollection(userUuid: string) {
  return collection(
    getUserCollection(),
    userUuid,
    COLLECTION.LOG_DAY,
  ) as CollectionReference<LogDay>
}
export function getUserLogDayRef(userUuid: string, day: number) {
  return doc(getUserLogDayCollection(userUuid), `${userUuid}-log-${day}`)
}

export function getStateCollection() {
  return collection(firestore, COLLECTION.STATE) as CollectionReference<State>
}
export function getStateRef(uuid?: string) {
  return doc(getStateCollection(), uuid)
}
