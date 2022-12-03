import {
  Code,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from '@mui/icons-material'
import { ButtonGroup, Menu } from '@mui/material'
import { PropsWithChildren, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { Editor, Range } from 'slate'
import { useFocused, useSlate } from 'slate-react'
import LeafMarkButton from './LeafMarkButton'

export const Portal = ({ children }: PropsWithChildren) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null
}

export const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const editor = useSlate()
  const inFocus = useFocused()

  useEffect(() => {
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection()
    const domRange = domSelection?.getRangeAt(0) as globalThis.Range
    const rect = domRange.getBoundingClientRect()
    el.style.opacity = '1'
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`
  })

  return (
    <Portal>
      <Menu
        ref={ref}
        open={false}
        onMouseDown={e => {
          e.preventDefault()
        }}
      >
        <ButtonGroup size="small">
          <LeafMarkButton format="bold">
            <FormatBold />
          </LeafMarkButton>
          <LeafMarkButton format="italic">
            <FormatItalic />
          </LeafMarkButton>
          <LeafMarkButton format="underlined">
            <FormatUnderlined />
          </LeafMarkButton>
          <LeafMarkButton format="code">
            <Code />
          </LeafMarkButton>
        </ButtonGroup>
      </Menu>
    </Portal>
  )
}
