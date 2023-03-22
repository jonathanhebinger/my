import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useItemContext } from '../../contexts'
import { Item } from '../../types'

const noBorder = { '&:last-child td, &:last-child th': { border: 0 } }

export interface MyLifeItemListProps {
  onCreate: () => void
  onSelect: (item: Item) => void
}
export default function MyLifeItemList({
  onCreate,
  onSelect,
}: MyLifeItemListProps) {
  const { itemList } = useItemContext()

  const List = itemList.map(item => {
    return (
      <TableRow key={item.uuid} sx={noBorder}>
        <TableCell component="th">
          <Typography>{item.name}</Typography>
        </TableCell>
        <TableCell align="right">{item.type}</TableCell>
        <TableCell align="right">
          <Button onClick={() => onSelect(item)}>Edit</Button>
        </TableCell>
      </TableRow>
    )
  })

  return (
    <TableContainer component={Paper} sx={{ p: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Name</Typography>
            </TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">
              <Button onClick={() => onCreate()} sx={{ px: 2 }}>
                Create
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{List}</TableBody>
      </Table>
    </TableContainer>
  )
}
