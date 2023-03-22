import { useAuthContext } from '../contexts'

export default function useUser() {
  const user = useAuthContext().user

  if (!user) throw new Error()

  return user
}
