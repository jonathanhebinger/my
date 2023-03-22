import { WithDate } from './with.date'

export type Id<Name extends string = string> = string & { name?: Name }
export type WithId<Name extends string = string> = {
  id: Id<Name>
}

export type Entity<
  Name extends string,
  Date extends boolean = false,
> = WithId<Name> & (Date extends true ? WithDate : unknown)

export type EntityToDto<Item extends WithId<string>> = Item extends WithId<
  infer Name
>
  ? {
      [Key in Filter_Id<Item>]: EntityToDtoDeep<Item[Key]>
    } & WithId<Name>
  : never
export type EntityToDtoDeep<Item> = Item extends Date
  ? number
  : Item extends (infer List)[]
  ? EntityToDtoDeep<List>[]
  : Item extends { [index: string]: unknown }
  ? { [Key in keyof Item]: EntityToDtoDeep<Item[Key]> }
  : Item

type Filter_Id<T extends object> = {
  [K in keyof T]: K extends '_id' ? never : K
}[keyof T]
