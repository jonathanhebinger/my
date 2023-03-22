import { Navigate, Outlet } from 'react-router'
import {
  useAuthContext,
  ItemContextProvider,
  DataContextProvider,
  DateDataContextProvider,
} from '../contexts'

export default function MyLifeMainPage() {
  const { user, loaded } = useAuthContext()

  if (!loaded) return null
  if (!user) return <Navigate to="sign" />

  return (
    <ItemContextProvider>
      <DataContextProvider>
        <DateDataContextProvider>
          <Outlet />
        </DateDataContextProvider>
      </DataContextProvider>
    </ItemContextProvider>
  )
}
