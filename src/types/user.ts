export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
  createdAt: Date
  updatedAt: Date
}

export enum Role {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
}
