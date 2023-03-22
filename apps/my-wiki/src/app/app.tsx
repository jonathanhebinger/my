import { httpInit, httpSetCors, httpSetRoot } from '@my/http'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { router } from './router/router'

httpInit()
httpSetRoot('http://localhost:5000/api')
httpSetCors(true)

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
