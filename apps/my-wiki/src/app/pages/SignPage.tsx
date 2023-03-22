import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuth'

export default function SignPage() {
  const { authSignedIn } = useAuthContext()

  return authSignedIn ? <Navigate to="/wiki" /> : <Outlet />
}
