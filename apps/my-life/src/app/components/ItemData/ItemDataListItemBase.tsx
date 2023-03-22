import { Grid, Stack, Typography } from '@mui/material'

const noBorder = { 'td, th': { border: 0 } }

export interface MyLifeItemDataListItemBaseProps {
  icon: JSX.Element
  name: JSX.Element | string
  data?: JSX.Element | string
  onClick?: () => void
}
export default function MyLifeItemDataListItemBase(
  props: MyLifeItemDataListItemBaseProps,
) {
  const { icon, name, data, onClick } = props

  return (
    <Grid
      container
      onClick={onClick}
      sx={{ cursor: onClick ? 'pointer' : '', ...noBorder }}
      alignItems="center"
    >
      <Grid item xs={4}>
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          spacing={1}
        >
          {icon}
          <Typography>{name}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={8}>
        {data}
      </Grid>
    </Grid>
  )
}
