import { Editor } from 'slate'
import { FormattedText } from '../../../types/slate'

export default function isMarkActive(
  editor: Editor,
  format: keyof Omit<FormattedText, 'text'>,
) {
  const marks = Editor.marks(editor)

  return marks ? marks[format] === true : false
}
