import { Link } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import { Id, NoteDto } from '@my/shared/types'
import { useMemo, useState } from 'react'
import { Editor, Element, Node, Path, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import { useNotebookNoteContext } from '../../hooks/useNote'
import { PageLinkElement } from '../../types/slate'
import PageSelector from '../NoteSelector'

function match(n: Node) {
  return !Editor.isEditor(n) && Element.isElement(n) && n.type === 'page'
}

function linkSelect(editor: Editor) {
  const [link] = Editor.nodes(editor, { match })

  if (!link) return

  return link as [PageLinkElement, Path]
}
function linkActive(editor: Editor) {
  return !!linkSelect(editor)
}
function linkUpsert(editor: Editor, page: string, name: string, at?: Path) {
  const link: PageLinkElement = {
    type: 'page',
    page,
    name,
    children: [{ text: '' }],
  }

  if (at) {
    Transforms.setNodes(editor, link, { at })
  } else {
    Transforms.insertNodes(editor, link)
  }
}

export default function PageLinkButton() {
  const { getOne } = useNotebookNoteContext()
  const editor = useSlate()

  const [open, setOpen] = useState(false)
  const [path, setPath] = useState<Path>()
  const [name, setName] = useState<string>('')
  const [id, setId] = useState<Id>()

  const page = useMemo(() => {
    return id ? getOne(id) : undefined
  }, [getOne, id])

  function handleOpen() {
    const pair = linkSelect(editor)

    if (pair) {
      const [link, path] = pair

      setId(link.page)
      setName(link.name)
      setPath(path)
    }

    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
    setId(undefined)
    setName('')
    setPath(undefined)
  }
  function handleSelect(pageList: NoteDto[]): void {
    const page = pageList[0]

    setId(page?.id || '')
    setName(page?.name || '')
  }
  function handleCreate() {
    page && linkUpsert(editor, page.id.toString(), name, path)
    handleClose()
  }

  editor.openPageLinkDialog = path => {
    setPath(path)
    handleOpen()
  }

  return (
    <>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
        <DialogTitle>Page Link</DialogTitle>
        <DialogContent>
          <Stack spacing={2} paddingTop={1}>
            <PageSelector
              label="Page"
              onSelect={handleSelect}
              selected={id ? [id] : []}
            />
            <TextField
              label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Button fullWidth disabled={!page} onClick={handleCreate}>
              {path ? 'Update' : 'Create'}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <Button
        onClick={handleOpen}
        variant={linkActive(editor) ? 'contained' : 'outlined'}
      >
        <Link />
      </Button>
    </>
  )
}
