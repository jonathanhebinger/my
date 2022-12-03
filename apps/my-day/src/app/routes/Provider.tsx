import { Outlet } from 'react-router-dom'
import { StatesProvider } from '../contexts/states'

export default function Provider() {
  return (
    <StatesProvider>
      <Outlet />
    </StatesProvider>
  )
}
