import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material'
import { Stack, Button, Typography } from '@mui/material'
import { actionDayAdd, selectDate, useAppDispatch } from '@my/shared/redux'
import { useSelector } from 'react-redux'

import LogNow from './LogNow'

export default function Log() {
  const date = useSelector(selectDate)
  const dispatch = useAppDispatch()
  const addBuilder = (add: number) => () => dispatch(actionDayAdd(add))

  return (
    <Stack>
      <Stack
        direction="row"
        padding={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row">
          <Button onClick={addBuilder(-7)}>
            <KeyboardDoubleArrowLeft />
          </Button>
          <Button onClick={addBuilder(-1)}>
            <KeyboardArrowLeft />
          </Button>
        </Stack>
        <Typography>{date.toDateString()}</Typography>
        <Stack direction="row">
          <Button onClick={addBuilder(1)}>
            <KeyboardArrowRight />
          </Button>
          <Button onClick={addBuilder(7)}>
            <KeyboardDoubleArrowRight />
          </Button>
        </Stack>
      </Stack>
      <LogNow />
    </Stack>
  )
}
