import { Autocomplete, TextField } from '@mui/material'
import { useMemo, useState } from 'react'
import useItemListTags from '../../hooks/useItemListTags'
import { Item } from '../../types'

export type ItemBase = Pick<Item, 'name' | 'info' | 'tags'>

export interface MyLifeItemBaseProps {
  item: ItemBase
  onChange: (item: ItemBase) => void
}
export default function MyLifeItemBase({
  item,
  onChange,
}: MyLifeItemBaseProps) {
  const [tagsText, setTagsTaxt] = useState('')

  const itemListTags = useItemListTags()

  const options = useMemo(() => {
    return tagsText && !itemListTags.includes(tagsText)
      ? [tagsText, ...itemListTags]
      : itemListTags
  }, [itemListTags, tagsText])

  function handleKeyChange<Key extends keyof ItemBase>(
    key: Key,
    value: ItemBase[Key],
  ) {
    onChange({ ...item, [key]: value })
  }

  return (
    <>
      <TextField
        size="small"
        label="Name"
        value={item.name}
        onChange={e => handleKeyChange('name', e.target.value)}
      />
      <TextField
        size="small"
        label="Info"
        value={item.info}
        onChange={e => handleKeyChange('info', e.target.value)}
      />
      <Autocomplete
        size="small"
        value={item.tags}
        multiple
        options={options}
        filterSelectedOptions
        renderInput={params => <TextField {...params} variant="outlined" />}
        inputValue={tagsText}
        onInputChange={(event, value) => setTagsTaxt(value)}
        onChange={(e, selected) => handleKeyChange('tags', selected)}
      />
    </>
  )
}
