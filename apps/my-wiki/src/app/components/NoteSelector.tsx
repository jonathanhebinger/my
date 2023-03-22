import {
  Autocomplete,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
  Chip,
  TextField,
} from '@mui/material'
import { Id, NoteDto } from '@my/shared/types'
import { useMemo } from 'react'
import { useNotebookNoteContext } from '../hooks/useNote'

export default function PageSelector({
  label,
  filter,
  disabled,
  multiple = false,
  selected,
  onSelect,
}: {
  label?: string
  filter?: (page: NoteDto) => boolean
  disabled?: (page: NoteDto) => boolean
  multiple?: boolean
  selected: Id[]
  onSelect: (pageList: NoteDto[]) => void
}) {
  const { database } = useNotebookNoteContext()

  const pageList = useMemo(() => {
    return filter ? database.filter(filter) : database
  }, [database, filter])
  const pageSelected = useMemo(() => {
    return pageList.filter(page => selected.includes(page.id))
  }, [pageList, selected])

  function handleChange(
    event: React.SyntheticEvent<Element, Event>,
    newValue: NoteDto | NoteDto[] | null,
  ) {
    if (!newValue) return onSelect([])

    onSelect(Array.isArray(newValue) ? newValue : [newValue])
  }
  function renderInput(params: AutocompleteRenderInputParams) {
    return <TextField {...params} label={label} />
  }
  function renderTags(
    tagValue: NoteDto[],
    getTagProps: AutocompleteRenderGetTagProps,
  ) {
    return tagValue.map((page, index) => (
      <Chip
        {...getTagProps({ index })}
        key={page.id.toString()}
        label={page.name}
        disabled={disabled && disabled(page)}
      />
    ))
  }
  function renderOption(
    props: React.HTMLAttributes<HTMLLIElement>,
    option: NoteDto,
  ) {
    return (
      <li {...props} key={option.id.toString()}>
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
