import {
  Cancel,
  Close,
  Delete,
  Edit,
  Save,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useWikiPageDatabase } from '../hooks/usePageDatabase'
import { useWikiOpenedPageList } from '../hooks/usePageOpenedList'
import { WikiPageEntity } from '../types/wiki'
import WikiPageEditor from './PageEditor'
import WikiPageViewer from './PageViewer'

export enum WikiPageMode {
  DISPLAY,
  EDITION,
}

export default function WikiPage({ page: initPage }: { page: WikiPageEntity }) {
  const { update, delete: remove } = useWikiPageDatabase()
  const { close } = useWikiOpenedPageList()

  const [show, setShow] = useState(true)
  const [edit, setEdit] = useState(false)
  const [page, setPage] = useState(initPage)

  function handleCancel() {
    setEdit(false)
    setPage(initPage)
  }
  function handleDelete() {
    //remove(page.uuid)
  }
  const handleSave = () => update(page)
  const handleEdit = () => setEdit(false)
  const handleClose = () => close(page.uuid)

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Typography variant="h5">{initPage.name}</Typography>
            <ButtonGroup size="small">
              <Button onClick={handleDelete} color="warning">
                <Delete />
              </Button>
              <Button onClick={edit ? handleSave : handleEdit}>
                {edit ? <Save /> : <Edit />}
              </Button>
              <Button onClick={edit ? handleCancel : handleClose}>
                {edit ? <Cancel /> : <Close />}
              </Button>
              <Button onClick={() => setShow(show => !show)}>
                {show ? <VisibilityOff /> : <Visibility />}
              </Button>
            </ButtonGroup>
          </Stack>
          {show ? (
            edit ? (
              <WikiPageEditor
                page={initPage}
                onUpdate={page => setPage(page)}
              />
            ) : (
              <WikiPageViewer page={initPage} />
            )
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  )
}
