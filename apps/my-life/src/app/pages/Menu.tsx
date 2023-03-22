import { AppBar, Button, Stack, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MyLifeDate from '../components/Date/Date'

export default function MyLifeMenu() {
  const navigate = useNavigate()

  function handleTracking() {
    navigate('tracking')
  }
  function handleEdit() {
    navigate('item')
  }

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Stack direction="row" justifyContent="space-between" flexGrow={1}>
          <Stack direction="row">
            <Button onClick={handleTracking}>Tracking</Button>
            <Button onClick={handleEdit}>Item</Button>
          </Stack>
          <MyLifeDate />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
