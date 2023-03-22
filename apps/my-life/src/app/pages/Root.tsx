import { Box, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'
import {
  AuthContextProvider,
  DataContextProvider,
  DateContextProvider,
  DateDataContextProvider,
  ItemContextProvider,
  useAuthContext,
} from '../contexts'
import MyLifeMenu from './Menu'

export default function MyLifeRootPage() {
  return (
    <AuthContextProvider>
      <Provider />
    </AuthContextProvider>
  )
}

function Provider() {
  const { user } = useAuthContext()

  if (!user) return null

  return (
    <DateContextProvider>
      <ItemContextProvider>
        <DataContextProvider>
          <DateDataContextProvider>
            <Stack>
              <MyLifeMenu />
              <Box padding={2}>
                <Outlet />
              </Box>
            </Stack>
          </DateDataContextProvider>
        </DataContextProvider>
      </ItemContextProvider>
    </DateContextProvider>
  )
}
