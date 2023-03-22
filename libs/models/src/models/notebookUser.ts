import { model, Schema } from 'mongoose'

import { NotebookUserEntity, NotebookUserEntityRole } from '@my/shared/types'

import { NotebookModel } from './notebook'
import { UserModel } from './user'

export const NOTEBOOKUSER = 'notebook-user'
export const notebookUserRoleSchema = new Schema<NotebookUserEntityRole>({
  manage: [{ type: Boolean, required: true }],
  create: [{ type: Boolean, required: true }],
  update: [{ type: Boolean, required: true }],
  delete: [{ type: Boolean, required: true }],
})
export const notebookUserSchema = new Schema<NotebookUserEntity>(
  {
    notebook: { type: String, ref: () => NotebookModel, required: true },
    user: { type: String, ref: () => UserModel, required: true },
    role: { type: notebookUserRoleSchema, required: true },
  },
  { timestamps: true },
)
export const NotebookUserModel = model(NOTEBOOKUSER, notebookUserSchema)
