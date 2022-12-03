
interface WithUuid<Name extends string> {
  uuid: string & { name?: Name }
}
interface WithBase {
  name: string
  info: string
}
interface WithDate {
  dateCreation: number
  dateModification: number
}

export type MyEvent = WithUuid<'event'> &
  WithBase &
  WithDate &
  Partial<WithMyTask & WithMyState & WithMyHabit & WithMyReminders>

export type MyEventLog = WithUuid<'event.log'> & {
  type: MyEvent['uuid']
  date: number
  duration?: number
}

export type WithMyTask = { task: MyTask }
export type WithMyState = { state: MyState }
export type WithMyHabit = { habit: MyHabit }
export type WithMyReminders = { reminders: MyReminder[] }

export type MyTask = {
  dueDate?: number
}

export type MyHabitType = 'repetition' | 'duration' | 'session'
export type MyHabit = {
  type: MyHabitType
  goals: MyGoal[]
}

export type MyState = {
  values: WithUuid<'state'> & WithBase
  multiple: boolean
}

export type MyReminderType = 'alarm' | 'notification' | 'mail'
export type MyReminder = {
  type: MyReminderType
  days: number[]
  from: [number, number][]
  period: number
}

export type MyGoalType = 'at.least' | 'at.most' | 'never'
export type MyGoalEach = 'day' | 'week' | 'month' | 'year'
export type MyGoal = {
  from: number
  to: number
  type: MyGoalType
  goal: number
  each: MyGoalEach
}

export function myEvent_isRemindersAllowed(myEvent: MyEvent): boolean {
  if (myEvent.task) return true
  if (
    myEvent.habit &&
    myEvent.habit.goals.some((goal) => goal.type === 'at.least')
  )
    return true
  return false
}
