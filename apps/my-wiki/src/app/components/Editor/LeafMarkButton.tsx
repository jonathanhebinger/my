import { Button } from '@mui/material'
import { PropsWithChildren } from 'react'
import { useSlate } from 'slate-react'
import { FormattedText } from '../../types/slate'
import isMarkActive from './utils/isMarkActive'
import toggleMark from './utils/toggleMark'

export interface LeafMarkButtonProps {
  format: keyof Omit<FormattedText, 'text'>
}
export default function LeafMarkButton({
  format,
  children,
}: PropsWithChildren<LeafMarkButtonProps>) {
  const editor = useSlate()
  const active = isMarkActive(editor, format)

  return (
    <Button
      variant={active ? 'contained' : 'outlined'}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {children}
    </Button>
  )
}
