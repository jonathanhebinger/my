import { Autocomplete, Stack, TextField } from '@mui/material'
import { useMemo } from 'react'
import { useDateDataContext } from '../../contexts'
import useDateItemData from '../../hooks/useDateItemData'
import { ItemSelect, ItemSelectOption } from '../../types'
import { castList } from '../../utils'

export default function MyLifeItemDataSelect({ item }: { item: ItemSelect }) {
  const data = useDateItemData(item)
  const { upsert } = useDateDataContext()
  const { optionList, multiple } = item

  const value = useMemo(() => {
    return optionList.filter(option => data.includes(option.uuid))
  }, [data, optionList])

  function handleChange(selected: ItemSelectOption[]) {
    const data = selected.map(option => option.uuid)

    upsert(item, data)
  }

  return (
    <Stack>
      <Autocomplete
        size="small"
        value={(multiple ? value : value[0]) || null}
        multiple={multiple}
        options={optionList}
        clearOnEscape={!multiple}
        getOptionLabel={option => option.name}
        filterSelectedOptions={multiple}
        renderInput={params => <TextField {...params} variant="outlined" />}
        onChange={(e, selected) => handleChange(castList(selected))}
      />
    </Stack>
  )
}
