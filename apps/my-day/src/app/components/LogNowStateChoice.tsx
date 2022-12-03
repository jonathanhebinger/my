import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useLogDayChoiceContext } from '../contexts/logDayChoice'
import { MyIcon } from './MyIcon'

export function LogNowStateChoice() {
  const { value, options, update } = useLogDayChoiceContext()

  const handleChange = (e: unknown, value: string) => update(+value)

  const Options = options.map(option => (
    <ToggleButton
      key={option.value}
      size="small"
      value={option.value}
      title={option.name}
    >
      <MyIcon icon={option.icon} color={option.color} />
    </ToggleButton>
  ))

  return (
    <ToggleButtonGroup
      fullWidth
      value={value}
      exclusive
      onChange={handleChange}
    >
      {Options}
    </ToggleButtonGroup>
  )
}
