import { Button, Input, Stack } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuth'

export default function SignIn() {
  const { authSignIn } = useAuthContext()
  const navigate = useNavigate()

  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')

  const handleSignIn = async () => {
    await authSignIn(mail, pass)
    navigate('wiki')
  }

  return (
    <Stack spacing={2}>
      <Input
        fullWidth
        value={mail}
        placeholder="Email"
        onChange={e => setMail(e.target.value)}
        autoComplete="email"
      />
      <Input
        fullWidth
        value={pass}
        type="password"
        placeholder="Password"
        onChange={e => setPass(e.target.value)}
        autoComplete="current-password"
      />
      <Button fullWidth onClick={handleSignIn}>
        Sign In
      </Button>
    </Stack>
  )
}
