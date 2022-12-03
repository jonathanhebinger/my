import Stack from '@mui/material/Stack'
import { RouterProvider } from 'react-router-dom'

import { router } from './router/router'

export function App() {
  return (
    <Stack padding={2}>
      <RouterProvider router={router}></RouterProvider>
    </Stack>
  )
}
