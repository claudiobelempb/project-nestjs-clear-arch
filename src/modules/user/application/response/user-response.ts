export namespace UserResponse {
  export class User {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    active: boolean
    createdAt?: Date
    updatedAt?: Date
  }

  export class UpdatePassword {
    id: string
    password: string
    oldPassword: string
  }
}
