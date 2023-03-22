export type Action<Name extends string, Data = never, Result = never> = {
  name: Name
  data: Data
  result: Result
}
export type ActionPayload<
  A extends Action<N, D, unknown>,
  N extends string = A['name'],
  D = A['data'],
> = { name: N; data: D }
export type ActionHandler<
  C extends Action<string, D, R>,
  Context = never,
  D = C['data'],
  R = C['result'],
> = (data: D, context: Context) => Promise<R>
