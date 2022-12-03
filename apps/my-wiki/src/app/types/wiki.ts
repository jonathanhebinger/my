export type WithUuid<Data> = { uuid: string } & Data

export type WikiDTO = {
  name: string
  public: boolean
}
export type WikiUserDTO = {
  user: string
  name: string
  role: string[]
}
export type WikiPageDTO = {
  name: string

  tag: boolean
  tags: string[]

  chunks: string[]

  data: string

  createDate: number
  updateDate: number
}

export type WikiEntity = WithUuid<WikiDTO>
export type WikiUserEntity = WithUuid<WikiUserDTO>
export type WikiPageEntity = WithUuid<WikiPageDTO>
