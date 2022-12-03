import { Button, Input, Stack } from '@mui/material'
import { actionAuthSignIn, useAppDispatch } from '@my/shared/redux'
import { useState } from 'react'

export default function SignIn() {
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')

  const dispatch = useAppDispatch()

  const handleSignIn = () =>
    dispatch(actionAuthSignIn({ email: mail, password: pass }))

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
