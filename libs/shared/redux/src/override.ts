import {
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
} from '@reduxjs/toolkit'
import { AppDispatch, AppState } from './state'

declare module '@reduxjs/toolkit' {
  function createAsyncThunk<Returned = void, ThunkArg = void>(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<
      Returned,
      ThunkArg,
      { state: AppState; dispatch: AppDispatch }
    >,
    options?:
      | AsyncThunkOptions<ThunkArg, { state: AppState; dispatch: AppDispatch }>
      | undefined,
  ): AsyncThunk<
    Returned,
    ThunkArg,
    {
      state: AppState
      dispatch: AppDispatch
    }
  >
}
