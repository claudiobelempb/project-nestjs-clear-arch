export namespace UserResponse {
  export class User {
    id: string
    firstName: string
    lastName: string
    email: string
    active: boolean
    createdAt?: Date
    updatedAt?: Date
  }

  export class Update
    implements
      Omit<
        User,
        'id' | 'email' | 'password' | 'active' | 'createdAt' | 'updatedAt'
      >
  {
    firstName: string
    lastName: string
  }

  export class UpdatePassword
    implements
      Omit<
        User,
        | 'id'
        | 'firstName'
        | 'lastName'
        | 'email'
        | 'password'
        | 'active'
        | 'createdAt'
        | 'updatedAt'
      >
  {
    password: string
    oldPassword: string
  }

  export class Pagination {
    items: User[]
    total: number
    currentPage: number
    lastPage: number
    perPage: number
  }
}
