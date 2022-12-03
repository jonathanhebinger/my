import { PropsWithChildren } from 'react'
import { Element } from 'slate'
import BlockPropButton from './ElementPropButton'

export interface ElementTypeButtonProps {
  type: Element['type']
}
export default function ElementTypeButton({
  type,
  children,
}: PropsWithChildren<ElementTypeButtonProps>) {
  return <BlockPropButton prop="type" value={type} children={children} />
}
