import { UserEntiry } from '../../domain/entities/user.entity'
import { UserPresenter } from '../../infra/presenters/user.presenter'
import { UserResponse } from '../response/user-response'

export class UserMapper {
  static toResponse(entity: UserEntiry): UserResponse.User {
    return entity.toJSON()
  }

  static toPresente(entity: UserResponse.User): UserResponse.User {
    return new UserPresenter(entity)
  }
}
