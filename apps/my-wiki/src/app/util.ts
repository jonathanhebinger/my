import { Id, WithId } from '@my/shared/types'

export function find<Item>(list: Item[], predicate: (item: Item) => boolean) {
  return list.find(predicate)
}
export function findById<Item extends WithId>(list: Item[], id: Id) {
  return find(list, item => item.id === id)
}
export function findOrFail<Item>(
  list: Item[],
  predicate: (item: Item) => boolean,
) {
  const item = find(list, predicate)

  if (item === undefined) throw new Error()

  return item
}
export function findOrFailById<Item extends WithId>(list: Item[], id: Id) {
  return findOrFail(list, item => item.id === id)
}
