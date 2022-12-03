/* eslint-disable @typescript-eslint/no-explicit-any */

import { Edit, Tag } from '@mui/icons-material'
import {
  Button,
  Chip,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
} from '@mui/material'
import { PropsWithChildren } from 'react'
import { ReactEditor, useReadOnly, useSlateStatic } from 'slate-react'
import { useWikiPageDatabase } from '../../hooks/usePageDatabase'
import { useWikiOpenedPageList } from '../../hooks/usePageOpenedList'
import { PageListElement } from '../../types/slate'

export function ElementPageList({
  element,
  attributes = {},
}: PropsWithChildren<{
  element: PageListElement
  attributes: any
}>) {
  const { getMany, database } = useWikiPageDatabase()
  const { open } = useWikiOpenedPageList()
  const readOnly = useReadOnly()

  const editor = useSlateStatic()

  const tags = getMany(element.tags).map(page => {
    return readOnly ? (
      <Link onClick={() => open(page.uuid)}>#{page.name}</Link>
    ) : (
      <Stack direction="row">#{page.name}</Stack>
    )
  })
  const list = database
    .filter(page => {
      return element.tags.every(tag => page.tags.includes(tag))
    })
    .map(page => {
      return (
        <li>
          <Link onClick={() => open(page.uuid)}>{page.name}</Link>
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
