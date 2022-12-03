import { Editor } from 'slate'

export default function wrapEditor(editor: Editor) {
  const { isInline, isVoid } = editor

  editor.isVoid = element => {
    return ['page', 'page-list'].includes(element.type) || isVoid(element)
  }
  editor.isInline = element => {
    return ['page'].includes(element.type) || isInline(element)
  }
  editor.openPageLinkDialog = () => {
    throw new Error('need override')
  }
  editor.openPageListDialog = () => {
    throw new Error('need override')
  }

  return editor
}
