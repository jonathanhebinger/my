import { AuthAction } from './auth'
import { NotebookAction } from './notebook'
import { NotebookNoteAction } from './notebookNote'
import { NotebookUserAction } from './notebookUser'
import { UserAction } from './user'

export type ActionList =
  | AuthAction
  | UserAction
  | NotebookAction
  | NotebookNoteAction
  | NotebookUserAction
