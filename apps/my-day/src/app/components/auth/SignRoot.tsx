import Button from '@mui/material/Button'
import Stack from '@mui/system/Stack'
import { useHref, useLinkClickHandler } from 'react-router-dom'

export default function SignRoot() {
  const hrefIn = useHref('in')
  const signIn = useLinkClickHandler('in')

  const hrefUp = useHref('up')
  const signUp = useLinkClickHandler('up')

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
