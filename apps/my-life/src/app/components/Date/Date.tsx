import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useDateContext } from '../../contexts'

export default function MyLifeDate() {
  const { dateString, dec7, dec1, inc1, inc7 } = useDateContext()

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
    >
      <Stack direction="row">
        <Button onClick={dec7} size="small" sx={{ minWidth: 32 }}>
          <KeyboardDoubleArrowLeft />
        </Button>
        <Button onClick={dec1} size="small" sx={{ minWidth: 32 }}>
          <KeyboardArrowLeft />
        </Button>
      </Stack>
      <Typography>{dateString}</Typography>
      <Stack direction="row">
        <Button onClick={inc1} size="small" sx={{ minWidth: 32 }}>
          <KeyboardArrowRight />
        </Button>
        <Button onClick={inc7} size="small" sx={{ minWidth: 32 }}>
          <KeyboardDoubleArrowRight />
        </Button>
      </Stack>
    </Stack>
  )
}
