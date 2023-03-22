import { Button, Input, Stack } from '@mui/material'
import { useState } from 'react'
import { useAuthContext } from '../../contexts/auth'

export default function MyLifeSignUp() {
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')

  const { signUp } = useAuthContext()

  function handleSignIn() {
    signUp(name, mail, pass)
  }

  return (
    <Stack spacing={2}>
      <Input
        fullWidth
        value={name}
        placeholder="Name"
        onChange={e => setName(e.target.value)}
        autoComplete="username"
      />
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
        autoComplete="new-password"
      />
      <Button fullWidth onClick={handleSignIn}>
        Sign In
      </Button>
    </Stack>
  )
}
