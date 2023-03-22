import { Id, Entity } from '../uuid'
import { LifeStateId } from './life-state'
import { UserId } from './user'

export type LifeStateData = 'life-state-data'
export type LifeStateDataId = Id<LifeStateData>

export type LifeStateDataEntity = Entity<LifeStateData, true> & {
  type: LifeStateId
  user: UserId
  date: number
  data: [number, number][]
}
