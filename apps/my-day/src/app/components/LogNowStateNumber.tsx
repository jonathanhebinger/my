import { Slider } from '@mui/material'
import { useMemo } from 'react'
import { useLogDayNumberContext } from '../contexts/logDayNumber'
import { MyIcon } from './MyIcon'

export const LogNowStateNumber = () => {
  const { value: position, update, type } = useLogDayNumberContext()
  const { min, max, controls, step } = type

  const marks = useMemo(
    () =>
      controls.map(control => ({
        value: control.position,
        label: control.icon ? (
          <MyIcon icon={control.icon} color={control.color} />
        ) : (
          control.name
        ),
      })),
    [controls],
  )

  const handleChange = (event: unknown, value: number | number[]) => {
    Array.isArray(value) ? update(value[0]) : update(value)
  }

  return (
    <Slider
      value={position}
      onChange={handleChange}
      marks={marks}
      min={min}
      max={max}
      step={step}
    />
  )
}
