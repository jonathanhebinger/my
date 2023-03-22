import { Id, WithId } from './uuid'

export type WikiData = {
  name: string
  public: boolean
}
export type WikiPageData = {
  name: string
  tags: Id[]
  data: string
  createdDate: number
  updatedDate: number
}
export type WikiUserData = {
  wiki: Id
  user: Id
  role: string[]
  name: string
}
export type WikiEntity = WithId & WikiData
export type WikiPageEntity = WithId & WikiPageData
export type WikiUserEntity = WithId & WikiUserData
