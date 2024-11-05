import {
  SearchResponse,
  SortDirectionResponse,
} from '@/shared/application/response/search-reponse'
import { UserResponse } from '../../application/response/user-response'

export namespace UserRequest {
  export class UserSignup implements Omit<UserResponse.User, 'active'> {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
  }

  export class UserSignin
    implements
      Omit<UserResponse.User, 'id' | 'firstName' | 'lastName' | 'active'>
  {
    email: string
    password: string
  }

  export class UpdatePassword
    implements Omit<UserResponse.UpdatePassword, 'id'>
  {
    password: string
    oldPassword: string
  }

  export class UpdateActive {
    id: string
    active: boolean
  }

  export class userId {
    id: string
  }

  export class FindAll implements SearchResponse {
    page?: number
    perPage?: number
    sort?: string
    sortDir?: SortDirectionResponse
    filter?: string
  }
}
