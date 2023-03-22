import Button from '@mui/material/Button'
import Stack from '@mui/system/Stack'
import { useHref, useLinkClickHandler } from 'react-router-dom'
import MyLifeSignOut from '../components/Auth/SignOut'
import { useAuthContext } from '../contexts/auth'

export default function MyLifeSignPage() {
  const { signedIn } = useAuthContext()

  const hrefIn = useHref('in')
  const signIn = useLinkClickHandler('in')

  const hrefUp = useHref('up')
  const signUp = useLinkClickHandler('up')

  if (signedIn) {
    return (
      <Stack>
        <MyLifeSignOut />
      </Stack>
    )
  }

  return (
    <Stack>
      <Button href={hrefIn} onClick={signIn}>
        Sign In
      </Button>
      <Button href={hrefUp} onClick={signUp}>
        Sign Up
      </Button>
    </Stack>
  )
}
