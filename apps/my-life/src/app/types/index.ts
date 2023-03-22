export type ItemBase<Type extends string = string> = {
  uuid: string
  user: string
  type: Type
  name: string
  info: string
  tags: string[]
}
export type ItemNumber = ItemBase<'number'> & {
  min?: number
  max?: number
  step: number
}
export type ItemSelect = ItemBase<'select'> & {
  optionList: ItemSelectOption[]
  multiple: boolean
}
export type ItemSelectOption = {
  uuid: number
  name: string
  info: string
}
export type ItemFolder = ItemBase<'folder'> & {
  itemList: string[]
}
export type Item = ItemNumber | ItemSelect | ItemFolder

export type ItemData = number[]
export type ItemDataUpdate = (itemData: ItemData) => void

export type Data = {
  uuid: string
  user: string
  date: number
  data: Record<string, number[]>
}
