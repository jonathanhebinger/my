import { httpExec, httpOnUnauthorized, httpSetAuth } from '@my/http'
import { AuthJwtPayload } from '@my/shared/types'
import constate from 'constate/dist/ts/src'
import { useEffect, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

function parseJwt(token: string): AuthJwtPayload {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  return JSON.parse(jsonPayload)
}

export const [AuthProvider, useAuthContext] = constate(() => {
  const [authJwtToken, setAuthJwtToken] = useLocalStorage<string>(
    'auth.jwt.token',
    '',
  )
  const authJwtPayload = useMemo(() => {
    httpSetAuth(authJwtToken)
    return authJwtToken ? parseJwt(authJwtToken) : { userId: '' }
  }, [authJwtToken])
  const authUserId = authJwtPayload.userId
  const authSignedIn = authUserId !== ''

  useEffect(() => {
    return httpOnUnauthorized(() => setAuthJwtToken(''))
  }, [setAuthJwtToken])

  async function authSignIn(email: string, password: string) {
    if (authSignedIn) return

    const { token } = await httpExec('auth.signIn', { email, password })

    httpSetAuth(authJwtToken)
    setAuthJwtToken(token)
  }
  async function authSignUp(name: string, email: string, password: string) {
    if (authSignedIn) return

    const { token } = await httpExec('user.create', { name, email, password })

    setAuthJwtToken(token)
  }
  function authLogOut() {
    setAuthJwtToken('')
  }

  return {
    authUserId,
    authSignedIn,
    authSignIn,
    authSignUp,
    authLogOut,
  }
})
