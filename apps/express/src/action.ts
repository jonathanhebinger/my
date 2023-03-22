/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ActionHandler } from '@my/shared/types'
import { Request } from 'express'
import { ActionList } from '@my/api'

export class ActionBus<ActionList extends Action<string, any, any>, Context> {
  handlers = new Map<ActionList['name'], ActionHandler<ActionList, Context>>()

  register<
    N extends ActionList['name'],
    A extends Action<N, any, any> = ActionList & Action<N, unknown, unknown>,
  >(name: N, handler: ActionHandler<A, Context>): void {
    if (this.handlers.has(name))
      throw new Error('Action handler already in use.')

    this.handlers.set(name, handler)
  }

  async execute<
    N extends ActionList['name'],
    A extends Action<N, any, any> = ActionList & Action<N, unknown, unknown>,
    D = A['data'],
    R = A['result'],
  >(
    name: N,
    data: D,
    context: Context,
  ): Promise<{ result: R } | { error: any }> {
    const handler = this.handlers.get(name)

    if (!handler) throw new Error(`Missing action handler : ${name}`)

    try {
      const result = await handler(data, context)

      return { result }
    } catch (error) {
      return { error }
    }
  }
}

export const actionBus = new ActionBus<ActionList, Request>()
