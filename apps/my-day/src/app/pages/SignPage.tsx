import { selectAuthSignedIn } from '@my/shared/redux'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function SignPage() {
  return useSelector(selectAuthSignedIn) ? <Navigate to="/log" /> : <Outlet />
}
