import { httpExec } from '@my/http'
import { UserDto, UserUpdateDto } from '@my/shared/types'
import constate from 'constate/dist/ts/src'
import { useEffect, useState } from 'react'

const useUser = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<UserDto>({
    id: userId,
    name: '',
    email: '',
    createdAt: 0,
    updatedAt: 0,
  })

  useEffect(() => {
    setUser({
      id: userId,
      name: '',
      email: '',
      createdAt: 0,
      updatedAt: 0,
    })
    httpExec('user.get', userId).then(setUser)
  }, [userId])

  function userUpdate(userUpdate: UserUpdateDto) {
    httpExec('user.update', userUpdate).then(setUser)
  }

  return {
    user,
    userUpdate,
  }
}

export const [UserProvider, useUserContext] = constate(useUser)
