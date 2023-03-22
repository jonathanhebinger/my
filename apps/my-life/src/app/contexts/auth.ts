import constate from 'constate'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export const [AuthContextProvider, useAuthContext] = constate(() => {
  const navigate = useNavigate()
  const { user, loaded, signedIn, signIn, signOut, signUp } = useAuth({
    onSignIn() {
      navigate('tracking')
    },
    onSignUp() {
      navigate('item')
    },
    onSignOut() {
      navigate('sign')
    },
  })

  useEffect(() => {
    if (!loaded) return
  }, [user, loaded, navigate])

  return {
    user,
    loaded,
    signedIn,
    signIn,
    signOut,
    signUp,
  }
})
