import { Checkbox } from '@mui/material'
import { PropsWithChildren } from 'react'
import { Node, Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { TodoElement } from '../../types/slate'

export default function ElementTodo({
  element,
  children,
  attributes,
}: PropsWithChildren<{
  element: TodoElement
  attributes: any
}>) {
  const editor = useSlateStatic()

  function handleClick() {
    const at = ReactEditor.findPath(editor, element)
    const update = { ...element, done: !element.done }

    Transforms.setNodes(editor, update, { at })

    console.log([...Node.ancestors(editor, at)])
  }

  return (
    <div {...attributes}>
      <Checkbox value={element.done} onClick={handleClick} />
      {children}
    </div>
  )
}
