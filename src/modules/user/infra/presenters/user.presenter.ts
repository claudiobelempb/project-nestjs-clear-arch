import { Transform } from 'class-transformer'
import { UserResponse } from '../../application/response/user-response'
import { UserEntiry } from '../../domain/entities/user.entity'

export class UserPresenter {
  id: string
  firstName: string
  lastName: string
  email: string
  active: boolean
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updatedAt: Date

  constructor(response: UserResponse.User) {
    this.id = response.id
    this.firstName = response.firstName
    this.lastName = response.lastName
    this.email = response.email
    this.active = response.active
    this.createdAt = response.createdAt
    this.updatedAt = response.updatedAt
  }
}
