import { Button, Input, Stack } from '@mui/material'
import { useState } from 'react'
import { useAuthContext } from '../../contexts/auth'

export default function MyLifeSignIn() {
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')

  const { signIn } = useAuthContext()

  function handleSignIn() {
    signIn(mail, pass)
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
