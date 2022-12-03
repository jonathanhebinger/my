import {
  Autocomplete,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
  Chip,
  TextField,
} from '@mui/material'
import { useMemo } from 'react'
import { useWikiPageDatabase } from '../hooks/usePageDatabase'
import { WikiPageEntity } from '../types/wiki'

export default function PageSelector({
  label,
  filter,
  disabled,
  multiple = false,
  selected,
  onSelect,
}: {
  label?: string
  filter?: (page: WikiPageEntity) => boolean
  disabled?: (page: WikiPageEntity) => boolean
  multiple?: boolean
  selected: string[]
  onSelect: (pageList: WikiPageEntity[]) => void
}) {
  const { database } = useWikiPageDatabase()

  const pageList = useMemo(() => {
    return filter ? database.filter(filter) : database
  }, [database, filter])
  const pageSelected = useMemo(() => {
    return pageList.filter(page => selected.includes(page.uuid))
  }, [pageList, selected])

  function handleChange(
    event: React.SyntheticEvent<Element, Event>,
    newValue: WikiPageEntity | WikiPageEntity[] | null,
  ) {
    if (!newValue) return onSelect([])

    onSelect(Array.isArray(newValue) ? newValue : [newValue])
  }
  function renderInput(params: AutocompleteRenderInputParams) {
    return <TextField {...params} label={label} />
  }
  function renderTags(
    tagValue: WikiPageEntity[],
    getTagProps: AutocompleteRenderGetTagProps,
  ) {
    return tagValue.map((page, index) => (
      <Chip
        {...getTagProps({ index })}
        key={page.uuid}
        label={page.name}
        disabled={disabled && disabled(page)}
      />
    ))
  }
  function renderOption(
    props: React.HTMLAttributes<HTMLLIElement>,
    option: WikiPageEntity,
  ) {
    return (
      <li {...props} key={option.uuid}>
        {option.name}
      </li>
    )
  }

  return (
    <Autocomplete
      value={multiple ? pageSelected : pageSelected[0] || null}
      multiple={multiple}
      onChange={handleChange}
      options={pageList}
      renderOption={renderOption}
      getOptionLabel={option => option.name}
      filterSelectedOptions
      renderInput={renderInput}
      renderTags={renderTags}
    />
  )
}
