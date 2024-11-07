import {
  SearchResponse,
  SortDirectionResponse,
} from '@/shared/application/response/search-reponse'
import { UserResponse } from '../../application/response/user-response'

export namespace UserRequest {
  export type User = {
    firstName: string
    lastName: string
    email: string
    password: string
  }
  export type UserSignup = {
    firstName: string
    lastName: string
    email: string
    password: string
  }

  export type UserSignin = Omit<
    UserResponse.User,
    'id' | 'firstName' | 'lastName' | 'active'
  > & {
    email: string
    password: string
  }

  export type UserUpdate = {
    firstName: string
    lastName: string
  }

  export type UpdatePassword = Omit<UserResponse.UpdatePassword, 'id'> & {
    password: string
    oldPassword: string
  }

  export type UpdateActive = {
    active: boolean
  }

  export interface userId {
    id: string
  }

  export type Search = SearchResponse & {
    page?: number
    perPage?: number
    sort?: string
    sortDir?: SortDirectionResponse
    filter?: string
  }
}
