import { DefaultResponse } from '@/shared/application/response/default-response'

export namespace UserResponse {
  export type User = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    active: boolean
    createdAt?: Date
    updatedAt?: Date
  }

  export type UpdatePassword = {
    password: string
    oldPassword: string
  }

  export type Pagination =
    DefaultResponse.PaginationResponse<UserResponse.User> & {
      items: User[]
      total?: number
      currentPage?: number
      lastPage?: number
      perPage?: number
    }
}
