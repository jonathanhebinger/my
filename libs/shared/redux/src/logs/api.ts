import { getDoc, setDoc } from 'firebase/firestore'

import { getUserLogDayRef } from '@my/shared/firebase'
import { Day, LogDay } from '@my/shared/types'

export const logApi = {
  async setOne(user: string, logDay: LogDay) {
    await setDoc(getUserLogDayRef(`${user}`, logDay.day), logDay)
  },
  async getOne(user: string, day: Day) {
    const snapshot = await getDoc(getUserLogDayRef(`${user}`, day))

    if (!snapshot.exists()) throw new Error()

    return snapshot.data()
  },
}
