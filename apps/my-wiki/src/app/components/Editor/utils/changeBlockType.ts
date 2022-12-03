import { Editor, Element, Transforms } from 'slate'
import isBlockActive from './isBlockActive'

const LIST_TYPES = ['numbered-list', 'bulleted-list']

export default function changeBlockType(editor: Editor, type: Element['type']) {
  const isActive = isBlockActive(editor, 'type', type)
  const isList = LIST_TYPES.includes(type)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })

  const newProperties: Partial<Element> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : type,
  }

  Transforms.setNodes<Element>(editor, newProperties)

  if (!isActive && isList) {
    // TODO fix as
    const block: Element = { type, children: [] } as Element
    Transforms.wrapNodes(editor, block)
  }
}
