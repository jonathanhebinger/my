import constate from 'constate'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export const [AuthContextProvider, useAuthContext] = constate(() => {
  const { user, loaded, signedIn, signIn, signOut, signUp } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loaded) return
    if (!user) navigate('/sign')
  }, [user, loaded, navigate])

  return { user, loaded, signedIn, signIn, signOut, signUp }
})
