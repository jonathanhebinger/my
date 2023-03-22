export function castList<Item>(listOrItem: null | Item | Item[]): Item[] {
  return listOrItem === null
    ? []
    : Array.isArray(listOrItem)
    ? listOrItem
    : [listOrItem]
}
