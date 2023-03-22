import { Button } from '@mui/material'
import { useAuthContext } from '../../contexts/auth'

export default function MyLifeSignOut() {
  const { signOut } = useAuthContext()

  return <Button onClick={signOut}>Sign Out</Button>
}
