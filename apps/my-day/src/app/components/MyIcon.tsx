import {
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentSatisfiedAlt,
  SentimentVerySatisfied,
} from '@mui/icons-material'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { Color, Icon } from '@my/shared/types'

export type MyIconProps = {
  icon: Icon
  color: Color
}
export function MyIcon({ icon, color }: MyIconProps) {
  const Icon = ICONS[icon]

  if (!Icon) return null

  return <Icon color={color} />
}

export const ICONS: Record<
  Icon,
  // eslint-disable-next-line @typescript-eslint/ban-types
  null | OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
> = {
  '': null,
  SentimentVeryDissatisfied: SentimentVeryDissatisfied,
  SentimentDissatisfied: SentimentDissatisfied,
  SentimentNeutral: SentimentNeutral,
  SentimentSatisfied: SentimentSatisfied,
  SentimentSatisfiedAlt: SentimentSatisfiedAlt,
  SentimentVerySatisfied: SentimentVerySatisfied,
}
