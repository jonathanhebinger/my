import { Button, Link, List, ListItem, Stack, Typography } from '@mui/material'
import { useNotebookNoteContext } from '../hooks/useNote'
import { useOpenedNoteList } from '../hooks/useNoteOpenedList'

export default function WikiMenu() {
  const { create, database } = useNotebookNoteContext()
  const { openedPageList, open } = useOpenedNoteList()

  const handlePageCreate = () => {
    create(page => open(page.id))
  }

  return (
    <Stack>
      <Button onClick={handlePageCreate}>Create</Button>
      <Typography>Opened :</Typography>
      <List dense>
        {openedPageList.map(({ id, name }) => (
          <ListItem dense key={id.toString()}>
            <Link onClick={() => open(id)}>{name}</Link>
          </ListItem>
        ))}
      </List>
      <Typography>Page :</Typography>
      <List dense>
        {database.map(({ id, name }) => (
          <ListItem dense key={id.toString()}>
            <Link onClick={() => open(id)}>{name}</Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
