import { Stack } from '@mui/material'
import { LogDayNumberProvider } from '../contexts/logDayNumber'
import { useStatesContext } from '../contexts/states'
import { LogNowState } from './LogNowState'

export function LogNowStates() {
  const StatesContext = useStatesContext()

  const States = StatesContext.keys.day.map(uuid => (
    <LogDayNumberProvider key={uuid} uuid={uuid}>
      <LogNowState />
    </LogDayNumberProvider>
  ))

  return <Stack>{States}</Stack>
}
