export function find<Item>(list: Item[], predicate: (item: Item) => boolean) {
  return list.find(predicate)
}
export function findByUuid<Item extends { uuid: string }>(
  list: Item[],
  uuid: string,
) {
  return find(list, item => item.uuid === uuid)
}
export function findOrFail<Item>(
  list: Item[],
  predicate: (item: Item) => boolean,
) {
  const item = find(list, predicate)

  if (item === undefined) throw new Error()

  return item
}
export function findOrFailByUuid<Item extends { uuid: string }>(
  list: Item[],
  uuid: string,
) {
  return findOrFail(list, item => item.uuid === uuid)
}
