import { Button, Input, Stack } from '@mui/material'
import { actionAuthSignUp, useAppDispatch } from '@my/shared/redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSignIn = () => {
    dispatch(actionAuthSignUp({ name, email: mail, password: pass }))
    navigate('log')
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
