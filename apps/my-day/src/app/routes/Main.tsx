import Stack from '@mui/material/Stack'
import { selectAuthSignedIn } from '@my/shared/redux'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import SignOut from '../components/auth/SignOut'

export default function Main() {
  const loggedIn = useSelector(selectAuthSignedIn)

  if (loggedIn) {
    return (
      <Stack spacing={2}>
        <SignOut />
        <Outlet />
      </Stack>
    )
  } else {
    return <Navigate to="sign" />
  }
}
