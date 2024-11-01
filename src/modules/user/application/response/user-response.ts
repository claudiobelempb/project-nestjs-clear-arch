export namespace UserResponse {
  export type User = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    active: boolean
    createdAt: Date
    updatedAt: Date
  }
}
