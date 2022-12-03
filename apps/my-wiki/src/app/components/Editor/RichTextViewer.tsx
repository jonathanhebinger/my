import { Paper } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { createEditor, Editor } from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'
import WikiElement from './Element'
import Leaf from './Leaf'
import wrapEditor from './utils/wrapEditor'

export interface RichTextViewerProps {
  text: string
}
export default function RichTextViewer({ text }: RichTextViewerProps) {
  const value = useMemo(
    () =>
      text
        ? JSON.parse(text)
        : [{ type: 'paragraph', children: [{ text: 'Empty Note' }] }],
    [text],
  )
  const editor = useMemo<Editor>(
    () => wrapEditor(withHistory(withReact(createEditor()))),
    [],
  )

  const renderElement = useCallback(
    (props: RenderElementProps) => <WikiElement {...props} />,
    [],
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  )

  return (
    <Slate editor={editor} value={value}>
      <Paper variant="outlined" sx={{ paddingX: 2, paddingY: 1 }}>
        <Editable
          readOnly
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Paper>
    </Slate>
  )
}
