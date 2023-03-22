import { Typography } from '@mui/material'
import { RenderElementProps } from 'slate-react'
import { ElementPageLink } from './ElementPageLink'
import { ElementPageList } from './ElementPageList'
import ElementTodo from './ElementTodo'

export default function WikiElement({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'h4':
      return (
        <Typography align={element.align} variant="h4" {...attributes}>
          {children}
        </Typography>
      )
    case 'h5':
      return (
        <Typography align={element.align} variant="h5" {...attributes}>
          {children}
        </Typography>
      )
    case 'h6':
      return (
        <Typography align={element.align} variant="h6" {...attributes}>
          {children}
        </Typography>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    case 'page':
      return (
        <ElementPageLink element={element} attributes={attributes}>
          {children}
        </ElementPageLink>
      )
    case 'page-list':
      return (
        <ElementPageList element={element} attributes={attributes}>
          {children}
        </ElementPageList>
      )
    case 'todo':
      return (
        <ElementTodo element={element} attributes={attributes}>
          {children}
        </ElementTodo>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}
