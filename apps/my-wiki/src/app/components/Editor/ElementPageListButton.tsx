import { List } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material'
import { Id, NoteDto } from '@my/shared/types'
import { useState } from 'react'
import { Editor, Element, Node, Path, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import { PageListElement } from '../../types/slate'
import PageSelector from '../NoteSelector'

function match(n: Node) {
  return !Editor.isEditor(n) && Element.isElement(n) && n.type === 'page-list'
}

function listSelect(editor: Editor) {
  const [list] = Editor.nodes(editor, { match })

  if (!list) return

  return list as [PageListElement, Path]
}
function listActive(editor: Editor) {
  return !!listSelect(editor)
}
function listUpsert(editor: Editor, tags: string[], at?: Path) {
  const list: PageListElement = {
    type: 'page-list',
    tags,
    children: [{ text: '' }],
  }

  if (at) {
    Transforms.setNodes(editor, list, { at })
  } else {
    at = [editor.selection?.anchor.path[0] || 0]

    const [entry] = Editor.nodes(editor, {
      at,
      match: n => !Editor.isEditor(n),
    })
    console.log(at, entry)
    const isEmpty =
      entry && Element.isElement(entry[0]) && Editor.isEmpty(editor, entry[0])

    console.log(isEmpty)
    if (isEmpty) {
      Transforms.setNodes(editor, list, { at })
    } else {
      Transforms.insertNodes(editor, list, { at: [at[0] + 1] })
    }
  }
}

export default function PageListButton() {
  const editor = useSlate()

  const [open, setOpen] = useState(false)
  const [path, setPath] = useState<Path>()
  const [tags, setTags] = useState<Id[]>([])

  function handleOpen() {
    const pair = listSelect(editor)

    if (pair) {
      const [list, path] = pair

      setTags(list.tags)
      setPath(path)
    }

    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
    setTags([])
    setPath(undefined)
  }
  function handleSelect(pageList: NoteDto[]): void {
    setTags(pageList.map(tag => tag.id))
  }
  function handleCreate() {
    tags.length > 0 &&
      listUpsert(
        editor,
        tags.map(id => id.toString()),
        path,
      )
    handleClose()
  }

  editor.openPageListDialog = (item, path) => {
    setPath(path)
    setTags(item.tags)
    setOpen(true)
  }

  return (
    <>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
        <DialogTitle>Page List</DialogTitle>
        <DialogContent>
          <Stack spacing={2} paddingTop={1}>
            <PageSelector
              label="Tags"
              multiple
              onSelect={handleSelect}
              selected={tags}
            />
            <Button
              fullWidth
              disabled={tags.length === 0}
              onClick={handleCreate}
            >
              {path ? 'Update' : 'Create'}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <Button
        onClick={handleOpen}
        variant={listActive(editor) ? 'contained' : 'outlined'}
      >
        <List />
      </Button>
    </>
  )
}
