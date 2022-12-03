import { AppDispatch, AppState } from '@my/shared/redux'
import {
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
} from '@reduxjs/toolkit'
import { EqualityFn } from 'react-redux'

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
declare module 'react-redux' {
  function useSelector<Selected = unknown>(
    selector: (state: AppState) => Selected,
    equalityFn?: EqualityFn<Selected> | undefined,
  ): Selected
}
