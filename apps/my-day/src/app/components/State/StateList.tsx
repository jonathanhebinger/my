import { Stack } from '@mui/material'
import { selectStates } from '@my/shared/redux'
import { useSelector } from 'react-redux'
import StateListItem from './StateListItem'

export default function StateList() {
  const { states } = useSelector(selectStates)

  const items = Object.values(states).map(({ uuid, name }) => {
    return <StateListItem key={uuid} uuid={uuid} name={name} />
  })

  return <Stack>{items}</Stack>
}
