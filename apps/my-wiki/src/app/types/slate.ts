// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor, Path } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    openPageListDialog(item: PageListElement, path: Path): void
    openPageLinkDialog(path: Path): void
  }

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}
export type Heading4Element = {
  type: 'h4'
  children: CustomText[]
}
export type Heading5Element = {
  type: 'h5'
  children: CustomText[]
}
export type Heading6Element = {
  type: 'h6'
  children: CustomText[]
}
export type BlockquoteElement = {
  type: 'block-quote'
  children: CustomText[]
}
export type BulletedListElement = {
  type: 'bulleted-list'
  children: CustomText[]
}
export type NumberedListElement = {
  type: 'numbered-list'
  children: CustomText[]
}
export type ListItemElement = {
  type: 'list-item'
  children: CustomText[]
}
export type PageLinkElement = {
  type: 'page'
  page: string
  name: string
  children: CustomText[]
}
export type PageListElement = {
  type: 'page-list'
  tags: string[]
  children: CustomText[]
}

export type ElementAlign = 'left' | 'center' | 'right' | 'justify'

export type CustomElement = {
  align?: ElementAlign
} & (
  | ParagraphElement
  | Heading4Element
  | Heading5Element
  | Heading6Element
  | BlockquoteElement
  | BulletedListElement
  | NumberedListElement
  | ListItemElement
  | PageLinkElement
  | PageListElement
)

export type FormattedText = {
  text: string
  bold?: true
  italic?: true
  code?: true
  underlined?: true
}

export type CustomText = FormattedText

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
