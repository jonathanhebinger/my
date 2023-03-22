import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { AuthContextProvider, DateContextProvider } from '../contexts'
import MyLifeMenu from './Menu'

export default function MyLifeRootPage() {
  return (
    <AuthContextProvider>
      <DateContextProvider>
        <MyLifeMenu />
        <Box padding={2}>
          <Outlet />
        </Box>
      </DateContextProvider>
    </AuthContextProvider>
  )
}
