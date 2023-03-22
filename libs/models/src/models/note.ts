import { model, Schema } from 'mongoose'

import { NoteEntity } from '@my/shared/types'

import { NotebookModel } from './notebook'

export const NOTE = 'note'
export const noteSchema = new Schema<NoteEntity>(
  {
    notebook: { type: String, ref: () => NotebookModel, required: true },
    name: { type: String, required: true },
    tags: [{ type: String, ref: () => NoteModel, required: true }],
    data: { type: String, required: true },
  },
  { timestamps: true },
) as Schema<NoteEntity>
export const NoteModel = model(NOTE, noteSchema)
