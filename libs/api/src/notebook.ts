import {
  Action,
  NotebookCreatedDto,
  NotebookCreateDto,
  NotebookDto,
  NotebookId,
  NotebookUpdateDto,
  NotebookUserDto,
  UserId,
} from '@my/shared/types'

export type NotebookAction =
  | Action<'notebook.get', NotebookId, NotebookDto>
  | Action<
      'notebook.getByUser',
      UserId,
      { user: NotebookUserDto; notebook: NotebookDto }[]
    >
  | Action<'notebook.create', NotebookCreateDto, NotebookCreatedDto>
  | Action<'notebook.update', NotebookUpdateDto, NotebookDto>
  | Action<'notebook.delete', NotebookId, NotebookDto>
