/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from '@mui/material'
import { PropsWithChildren } from 'react'
import { ReactEditor, useReadOnly, useSlateStatic } from 'slate-react'
import { useWikiPageDatabase } from '../../hooks/usePageDatabase'
import { useWikiOpenedPageList } from '../../hooks/usePageOpenedList'
import { PageLinkElement } from '../../types/slate'

export function ElementPageLink({
  element,
  children,
  attributes = {},
}: PropsWithChildren<{
  element: PageLinkElement
  attributes: any
}>) {
  const { getOne } = useWikiPageDatabase()
  const { open } = useWikiOpenedPageList()

  const editor = useSlateStatic()
  const readOnly = useReadOnly()

  const page = getOne(element.page)

  const handleClick = () => {
    if (readOnly) {
      open(page.uuid)
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
