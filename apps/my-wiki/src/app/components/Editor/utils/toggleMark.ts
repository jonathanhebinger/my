import { Editor } from 'slate'
import { FormattedText } from '../../../types/slate'
import isMarkActive from './isMarkActive'

export default function toggleMark(
  editor: Editor,
  format: keyof Omit<FormattedText, 'text'>,
) {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}
