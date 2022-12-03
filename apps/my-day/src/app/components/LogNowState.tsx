import { Stack, Typography } from '@mui/material'
import { useLogDayNumberContext } from '../contexts/logDayNumber'
import { LogNowStateNumber } from './LogNowStateNumber'

export function LogNowState() {
  const { state, nearest } = useLogDayNumberContext()

  return (
    <Stack padding={2} spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography title={state.info} textAlign="right" variant="h6">
          {state.name}
        </Typography>
        <Typography title={state.info} textAlign="right">
          {nearest?.name}
        </Typography>
      </Stack>
      <Stack paddingX={2}>
        <LogNowStateNumber />
      </Stack>
    </Stack>
  )
}
