import { Tag } from '@mui/icons-material'
import { Autocomplete, Stack, TextField } from '@mui/material'
import useItemListTags from '../../hooks/useItemListTags'

export interface MyLifeTagsSearchProps {
  tags: string[]
  onChange: (tags: string[]) => void
}
export default function MyLifeTagsSearch({
  tags,
  onChange,
}: MyLifeTagsSearchProps) {
  const tagsList = useItemListTags()

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Tag />
      <Autocomplete
        fullWidth
        multiple
        size="small"
        value={tags}
        options={tagsList}
        filterSelectedOptions
        renderInput={params => <TextField {...params} variant="outlined" />}
        onChange={(e, selected) => onChange(selected)}
      />
    </Stack>
  )
}
