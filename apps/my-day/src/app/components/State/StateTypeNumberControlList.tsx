import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { State } from '@my/shared/types'
import { useFieldArray, useFormContext } from 'react-hook-form'
import StateTypeNumberControl from './StateTypeNumberControl'

export default function StateTypeNumberControlList() {
  const { control } = useFormContext<State>()

  const { fields, remove } = useFieldArray({
    control,
    name: 'typeNumber.controls',
  })

  return (
    <Stack>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">_Icon</TableCell>
              <TableCell align="right">_Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields
              .sort((a, b) => a.position - b.position)
              .map((item, index) => (
                <StateTypeNumberControl
                  key={item.id}
                  index={index}
                  remove={remove}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
