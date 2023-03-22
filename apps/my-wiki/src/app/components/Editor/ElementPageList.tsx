/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, Stack } from '@mui/material'
import { PropsWithChildren } from 'react'
import { ReactEditor, useReadOnly, useSlateStatic } from 'slate-react'
import { useNotebookNoteContext } from '../../hooks/useNote'
import { useOpenedNoteList } from '../../hooks/useNoteOpenedList'
import { PageListElement } from '../../types/slate'

export function ElementPageList({
  element,
  attributes = {},
}: PropsWithChildren<{
  element: PageListElement
  attributes: any
}>) {
  const { getMany, database } = useNotebookNoteContext()
  const { open } = useOpenedNoteList()
  const readOnly = useReadOnly()

  const editor = useSlateStatic()

  const tags = getMany(element.tags).map(page => {
    return readOnly ? (
      <Link onClick={() => open(page.id)}>#{page.name}</Link>
    ) : (
      <Stack direction="row">#{page.name}</Stack>
    )
  })
  const list = database
    .filter(page => {
      return element.tags.every(tag =>
        page.tags.some(id => id.toString() === tag),
      )
    })
    .map(page => {
      return (
        <li>
          <Link onClick={() => open(page.id)}>{page.name}</Link>
        </li>
      )
    })

  const handleClick = () => {
    const path = ReactEditor.findPath(editor, element)

    editor.openPageListDialog(element, path)
  }

  return (
    <Stack {...attributes} contentEditable={false}>
      {readOnly ? (
        <Stack direction="row" spacing={1}>
          {tags}
        </Stack>
      ) : (
        <Link>
          <Stack direction="row" spacing={1} onClick={handleClick}>
            {tags}
          </Stack>
        </Link>
      )}
      <ul>
        {list}
        {list.length === 0 && <li>No Page Found</li>}
      </ul>
    </Stack>
  )
}
