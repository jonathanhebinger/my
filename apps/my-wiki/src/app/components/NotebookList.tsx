import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { Stack } from '@mui/system'
import { httpExec } from '@my/http'
import { WikiEntity } from '@my/shared/types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../hooks/useUser'
import { useNotebookList } from '../hooks/useNotebookList'

export default function NotebookList() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const { userNotebookList } = useNotebookList(user.id)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  async function handleCreate() {
    const { notebook } = await httpExec('notebook.create', {
      name,
      public: false,
    })

    navigate(notebook.id)
  }

  return (
    <>
      <Card>
        <CardHeader title="My Notebooks" />
        <CardContent>
          <Stack spacing={2}>
            <Button onClick={() => setOpen(true)}>Create Wiki</Button>
            {userNotebookList.map(({ notebook }) => (
              <UserWikiListItem key={notebook.id} wiki={notebook} />
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Create Wiki</DialogTitle>
        <DialogContent>
          <Stack spacing={2} paddingTop={1}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Button fullWidth disabled={!name} onClick={handleCreate}>
              Create
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function UserWikiListItem({ wiki }: { wiki: WikiEntity }) {
  const navigate = useNavigate()

  function handleOpen() {
    navigate(wiki.id.toString())
  }

  return <Typography onClick={handleOpen}>{wiki.name}</Typography>
}
