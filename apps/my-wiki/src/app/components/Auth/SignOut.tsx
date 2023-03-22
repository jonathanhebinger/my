import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuth'

export default function SignOut() {
  const { authLogOut } = useAuthContext()
  const navigate = useNavigate()

  const handleSignOut = () => {
    authLogOut()
    navigate('sign')
  }

  return <Button onClick={handleSignOut}>Sign Out</Button>
}
