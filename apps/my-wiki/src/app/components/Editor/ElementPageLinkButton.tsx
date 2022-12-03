import { Link } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Editor, Element, Node, Path, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import { useWikiPageDatabase } from '../../hooks/usePageDatabase'
import { PageLinkElement } from '../../types/slate'
import { WikiPageEntity } from '../../types/wiki'
import PageSelector from '../PageSelector'

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
  const { getOne } = useWikiPageDatabase()
  const editor = useSlate()

  const [open, setOpen] = useState(false)
  const [path, setPath] = useState<Path>()
  const [name, setName] = useState<string>('')
  const [uuid, setUuid] = useState<string>('')

  const page = useMemo(() => {
    return uuid ? getOne(uuid) : undefined
  }, [getOne, uuid])

  function handleOpen() {
    const pair = linkSelect(editor)

    if (pair) {
      const [link, path] = pair

      setUuid(link.page)
      setName(link.name)
      setPath(path)
    }

    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
    setUuid('')
    setName('')
    setPath(undefined)
  }
  function handleSelect(pageList: WikiPageEntity[]): void {
    const page = pageList[0]

    setUuid(page?.uuid || '')
    setName(page?.name || '')
  }
  function handleCreate() {
    page && linkUpsert(editor, page.uuid, name, path)
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
              selected={uuid ? [uuid] : []}
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
