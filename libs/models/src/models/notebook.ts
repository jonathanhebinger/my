import { NotebookEntity } from '@my/shared/types'
import { model, Schema } from 'mongoose'

export const NOTEBOOK = 'notebook'
export const notebookSchema = new Schema<NotebookEntity>(
  {
    name: { type: String, required: true },
    public: { type: Boolean, required: true },
  },
  { timestamps: true },
)
export const NotebookModel = model(NOTEBOOK, notebookSchema)
