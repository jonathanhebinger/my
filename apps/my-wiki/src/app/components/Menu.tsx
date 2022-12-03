import { Button, Link, List, ListItem, Stack, Typography } from '@mui/material'
import { useWikiPageDatabase } from '../hooks/usePageDatabase'
import { useWikiOpenedPageList } from '../hooks/usePageOpenedList'

export default function WikiMenu() {
  const { create, database } = useWikiPageDatabase()
  const { openedPageList, open } = useWikiOpenedPageList()

  const handlePageCreate = () => {
    create(page => open(page.uuid))
  }

  return (
    <Stack>
      <Button onClick={handlePageCreate}>Create</Button>
      <Typography>Opened :</Typography>
      <List dense>
        {openedPageList.map(({ uuid, name }) => (
          <ListItem dense>
            <Link key={uuid} onClick={() => open(uuid)}>
              {name}
            </Link>
          </ListItem>
        ))}
      </List>
      <Typography>Page :</Typography>
      <List dense>
        {database.map(({ uuid, name }) => (
          <ListItem dense>
            <Link key={uuid} onClick={() => open(uuid)}>
              {name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
