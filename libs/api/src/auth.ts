import { Action, AuthSignedInDto, AuthSignInDto } from '@my/shared/types'

export type AuthAction = Action<'auth.signIn', AuthSignInDto, AuthSignedInDto>
