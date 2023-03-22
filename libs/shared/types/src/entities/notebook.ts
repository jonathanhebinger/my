import { Entity, Id } from '../uuid'

export type Notebook = 'notebook'
export type NotebookId = Id<Notebook>
export type NotebookEntity = Entity<'notebook', true> & {
  name: string
  public: boolean
}
