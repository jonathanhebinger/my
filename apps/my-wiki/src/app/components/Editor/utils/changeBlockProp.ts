import { Editor, Element, Transforms } from 'slate'
import changeBlockType from './changeBlockType'

export default function changeBlockProp<
  Key extends keyof Element,
  Value extends Element[Key],
>(editor: Editor, blockKey: Key, blockValue: Value) {
  if (blockKey === 'type') {
    changeBlockType(editor, blockValue as Element['type'])
  } else {
    Transforms.setNodes<Element>(editor, { [blockKey]: blockValue })
  }
}
