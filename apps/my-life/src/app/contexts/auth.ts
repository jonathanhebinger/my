import constate from 'constate'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export const [AuthContextProvider, useAuthContext] = constate(() => {
  const navigate = useNavigate()
  const navigateRef = useRef(navigate)
  navigateRef.current = navigate
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

  const connected = user !== null
  useEffect(() => {
    if (connected) navigateRef.current('tracking')
  }, [connected])

  return {
    user,
    loaded,
    signedIn,
    signIn,
    signOut,
    signUp,
  }
})
