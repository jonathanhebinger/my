import { Box, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { AuthContextProvider, DateContextProvider } from '../contexts'
import MyLifeMenu from './Menu'

export default function MyLifeRootPage() {
  return (
    <AuthContextProvider>
      <DateContextProvider>
        <Stack>
          <Box padding={2}>
            <MyLifeMenu />
            <Outlet />
          </Box>
        </Stack>
      </DateContextProvider>
    </AuthContextProvider>
  )
}
