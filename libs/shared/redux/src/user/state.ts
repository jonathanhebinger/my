import { User } from "@my/shared/types"

export interface UserState extends User { 
  uuid: string
  name: string
  email: string
}

