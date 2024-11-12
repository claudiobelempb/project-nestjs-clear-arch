import { Transform } from 'class-transformer'
import { UserResponse } from '../../application/response/user-response'
import { UserEntiry } from '../../domain/entities/user.entity'
import { DefaultPresenter } from '@/shared/infra/presenters/default-presenter'

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

export class UserCollectionPresenter extends DefaultPresenter.Collection<UserPresenter> {
  data: UserPresenter[]

  constructor(response: UserResponse.Pagination) {
    const { items, ...props } = response
    super(props)
    this.data = items.map(item => new UserPresenter(item))
  }
}
