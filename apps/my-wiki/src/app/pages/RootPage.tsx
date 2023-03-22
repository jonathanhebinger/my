import Stack from '@mui/material/Stack'
import { Navigate, Outlet } from 'react-router-dom'
import SignOut from '../components/Auth/SignOut'
import { useAuthContext } from '../hooks/useAuth'
import { UserProvider } from '../hooks/useUser'

export default function RootPage() {
  const { authUserId } = useAuthContext()

  console.log(authUserId)

  return authUserId ? (
    <UserProvider userId={authUserId}>
      <Stack spacing={2}>
        <SignOut />
        <Outlet />
      </Stack>
    </UserProvider>
  ) : (
    <Navigate to="sign" />
  )
}
