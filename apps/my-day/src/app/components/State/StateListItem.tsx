import { Button } from '@mui/material'
import { State } from '@my/shared/types'
import { useHref, useLinkClickHandler } from 'react-router-dom'

export type StateListItemProps = Pick<State, 'uuid' | 'name'>

export default function StateListItem({ uuid, name }: StateListItemProps) {
  const linkHref = useHref(uuid)
  const linkAction = useLinkClickHandler(uuid)

  return (
    <Button href={linkHref} onClick={linkAction}>
      {name}
    </Button>
  )
}
