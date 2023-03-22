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

export type BaseElement<Type extends string> = {
  type: Type
  align?: ElementAlign
  children: CustomText[]
}

export type ParagraphElement = BaseElement<'paragraph'>
export type Heading4Element = BaseElement<'h4'>
export type Heading5Element = BaseElement<'h5'>
export type Heading6Element = BaseElement<'h6'>
export type BlockquoteElement = BaseElement<'block-quote'>
export type BulletedListElement = BaseElement<'bulleted-list'>
export type NumberedListElement = BaseElement<'numbered-list'>
export type ListItemElement = BaseElement<'list-item'>
export type PageLinkElement = BaseElement<'page'> & {
  page: string
  name: string
}
export type PageListElement = BaseElement<'page-list'> & {
  tags: string[]
}
export type TodoElement = BaseElement<'todo'> & {
  done: boolean
  ref?: string
}

export type ElementAlign = 'left' | 'center' | 'right' | 'justify'

export type CustomElement =
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
  | TodoElement

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
