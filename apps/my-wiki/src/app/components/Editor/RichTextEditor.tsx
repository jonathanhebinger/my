import {
  Code,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
} from '@mui/icons-material'
import { ButtonGroup, Paper, Stack, Typography } from '@mui/material'
import isHotkey from 'is-hotkey'
import { useCallback, useMemo } from 'react'
import { createEditor, Editor } from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'
import { FormattedText } from '../../types/slate'
import WikiElement from './Element'
import BlockPropButton from './ElementPropButton'
import ElementTypeButton from './ElementTypeButton'
import Leaf from './Leaf'
import LeafMarkButton from './LeafMarkButton'
import PageLinkButton from './ElementPageLinkButton'
import toggleMark from './utils/toggleMark'
import PageListButton from './ElementPageListButton'

const HOTKEYS: { [index: string]: keyof Omit<FormattedText, 'text'> } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underlined',
  'mod+`': 'code',
}

const wrapEditor = (editor: Editor) => {
  const { isInline, isVoid } = editor

  editor.isVoid = element => {
    return ['page'].includes(element.type) || isVoid(element)
  }
  editor.isInline = element => {
    return ['page'].includes(element.type) || isInline(element)
  }
  editor.openPageLinkDialog = () => {
    throw new Error('need override')
  }

  return editor
}

export interface RichTextEditorProps {
  text: string
  onChange: (text: string) => void
}
export default function RichTextEditor({
  text,
  onChange,
}: RichTextEditorProps) {
  const value = useMemo(
    () =>
      text
        ? JSON.parse(text)
        : [{ type: 'paragraph', children: [{ text: 'Notes' }] }],
    [text],
  )
  const editor = useMemo<Editor>(
    () => wrapEditor(withHistory(withReact(createEditor()))),
    [],
  )

  const renderElement = useCallback(
    (props: RenderElementProps) => <WikiElement {...props} />,
    [],
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  )

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={value => onChange(JSON.stringify(value))}
    >
      <Stack direction="row" flexWrap="wrap">
        <ButtonGroup size="small" sx={{ padding: 0.5 }}>
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

        <ButtonGroup size="small" sx={{ padding: 0.5 }}>
          <BlockPropButton prop="align" value="left">
            <FormatAlignLeft />
          </BlockPropButton>
          <BlockPropButton prop="align" value="center">
            <FormatAlignCenter />
          </BlockPropButton>
          <BlockPropButton prop="align" value="right">
            <FormatAlignRight />
          </BlockPropButton>
          <BlockPropButton prop="align" value="justify">
            <FormatAlignJustify />
          </BlockPropButton>
        </ButtonGroup>

        <ButtonGroup size="small" sx={{ padding: 0.5 }}>
          <ElementTypeButton type="paragraph">
            <Typography>P</Typography>
          </ElementTypeButton>
          <ElementTypeButton type="h4">
            <Typography>T1</Typography>
          </ElementTypeButton>
          <ElementTypeButton type="h5">
            <Typography>T2</Typography>
          </ElementTypeButton>
          <ElementTypeButton type="h6">
            <Typography>T3</Typography>
          </ElementTypeButton>
        </ButtonGroup>

        <ButtonGroup size="small" sx={{ padding: 0.5 }}>
          <ElementTypeButton type="block-quote">
            <FormatQuote />
          </ElementTypeButton>
          <PageLinkButton />
          <PageListButton />
        </ButtonGroup>

        <ButtonGroup size="small" sx={{ padding: 0.5 }}>
          <ElementTypeButton type="numbered-list">
            <FormatListNumbered />
          </ElementTypeButton>
          <ElementTypeButton type="bulleted-list">
            <FormatListBulleted />
          </ElementTypeButton>
        </ButtonGroup>
      </Stack>
      <Paper variant="outlined" sx={{ paddingX: 2, paddingY: 1 }}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }
          }}
        />
      </Paper>
    </Slate>
  )
}
