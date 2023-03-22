import { CheckBox } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material'
import { useState } from 'react'
import { Editor, Element, Node, Path, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import { TodoElement } from '../../types/slate'

function match(n: Node) {
  return !Editor.isEditor(n) && Element.isElement(n) && n.type === 'todo'
}

function todoSelect(editor: Editor) {
  const [todo] = Editor.nodes(editor, { match })

  if (!todo) return

  return todo as [TodoElement, Path]
}
function todoActive(editor: Editor) {
  return !!todoSelect(editor)
}
function todoUpsert(editor: Editor) {
  const pair = todoSelect(editor)
  const todo: TodoElement = {
    type: 'todo',
    done: false,
    children: [{ text: '' }],
  }

  if (pair) {
    Transforms.setNodes(editor, todo, { at: pair[1] })
  } else {
    Transforms.wrapNodes(editor, todo)
  }
}

export default function TodoButton() {
  const editor = useSlate()

  const [open, setOpen] = useState(false)

  function handleClose() {
    setOpen(false)
  }
  function handleCreate() {
    todoUpsert(editor)
    handleClose()
  }

  return (
    <>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
        <DialogTitle>Page Todo</DialogTitle>
        <DialogContent>
          <Stack spacing={2} paddingTop={1}></Stack>
        </DialogContent>
      </Dialog>
      <Button
        onClick={() => handleCreate()}
        variant={todoActive(editor) ? 'contained' : 'outlined'}
      >
        <CheckBox />
      </Button>
    </>
  )
}
