import { UserData } from '@my/shared/types'

export interface UserState extends UserData {
  uuid: string
  name: string
  email: string
}
