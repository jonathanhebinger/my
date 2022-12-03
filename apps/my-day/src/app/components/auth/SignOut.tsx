import Button from '@mui/material/Button'
import { actionAuthLogOut, useAppDispatch } from '@my/shared/redux'
import { useNavigate } from 'react-router-dom'

export default function SignOut() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSignOut = () => {
    dispatch(actionAuthLogOut())
    navigate('sign')
  }

  return <Button onClick={handleSignOut}>Sign Out</Button>
}
