/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from '@mui/material'
import { PropsWithChildren } from 'react'
import { ReactEditor, useReadOnly, useSlateStatic } from 'slate-react'
import { useNotebookNoteContext } from '../../hooks/useNote'
import { useOpenedNoteList } from '../../hooks/useNoteOpenedList'
import { PageLinkElement } from '../../types/slate'

export function ElementPageLink({
  element,
  children,
  attributes = {},
}: PropsWithChildren<{
  element: PageLinkElement
  attributes: any
}>) {
  const { getOne } = useNotebookNoteContext()
  const { open } = useOpenedNoteList()

  const editor = useSlateStatic()
  const readOnly = useReadOnly()

  const page = getOne(element.page)

  const handleClick = () => {
    if (readOnly) {
      open(page.id)
    } else {
      const path = ReactEditor.findPath(editor, element)

      editor.openPageLinkDialog(path)
    }
  }

  return (
    <Link {...attributes} contentEditable={false} onClick={handleClick}>
      {children}
      {element.name}
      {readOnly ? null : <>[{page.name}]</>}
    </Link>
  )
}
