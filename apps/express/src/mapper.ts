import {
  NotebookDto,
  NotebookEntity,
  NotebookUserDto,
  NotebookUserEntity,
  NoteDto,
  NoteEntity,
  UserEntity,
} from '@my/shared/types'

export const Mapper = {
  user(userEntity: UserEntity) {
    const { id, name, email, createdAt, updatedAt } = userEntity

    return {
      id,
      name,
      email,
      createdAt: createdAt.getTime(),
      updatedAt: updatedAt.getTime(),
    }
  },
  userList(userEntityList: UserEntity[]) {
    return userEntityList.map(Mapper.user)
  },
  note(noteEntity: NoteEntity): NoteDto {
    const { id, notebook, name, data, tags, createdAt, updatedAt } = noteEntity

    return {
      id,
      notebook,
      name,
      data,
      tags,
      createdAt: createdAt.getTime(),
      updatedAt: updatedAt.getTime(),
    }
  },
  noteList(noteEntityList: NoteEntity[]): NoteDto[] {
    return noteEntityList.map(Mapper.note)
  },
  notebook(notebookEntity: NotebookEntity): NotebookDto {
    const { id, name, public: isPublic, createdAt, updatedAt } = notebookEntity

    return {
      id,
      name,
      public: isPublic,
      createdAt: createdAt.getTime(),
      updatedAt: updatedAt.getTime(),
    }
  },
  notebookList(notebookEntityList: NotebookEntity[]): NotebookDto[] {
    return notebookEntityList.map(Mapper.notebook)
  },
  notebookUser(notebookUserEntity: NotebookUserEntity): NotebookUserDto {
    const { id, notebook, user, role, createdAt, updatedAt } =
      notebookUserEntity

    return {
      id,
      notebook,
      user,
      role,
      createdAt: createdAt.getTime(),
      updatedAt: updatedAt.getTime(),
    }
  },
  notebookUserList(
    notebookUserEntityList: NotebookUserEntity[],
  ): NotebookUserDto[] {
    return notebookUserEntityList.map(Mapper.notebookUser)
  },
}
