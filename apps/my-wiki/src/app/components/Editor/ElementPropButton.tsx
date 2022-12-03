import { Button } from '@mui/material'
import { PropsWithChildren } from 'react'
import { Element } from 'slate'
import { useSlate } from 'slate-react'
import changeBlockProp from './utils/changeBlockProp'
import isBlockActive from './utils/isBlockActive'

export interface BlockPropButtonProps<Key extends keyof Element> {
  prop: Key
  value: Element[Key]
}
export default function BlockPropButton<Key extends keyof Element>({
  prop,
  value,
  children,
}: PropsWithChildren<BlockPropButtonProps<Key>>) {
  const editor = useSlate()
  const active = isBlockActive(editor, prop, value)

  return (
    <Button
      variant={active ? 'contained' : 'outlined'}
      onMouseDown={event => {
        event.preventDefault()
        changeBlockProp(editor, prop, value)
      }}
    >
      {children}
    </Button>
  )
}
