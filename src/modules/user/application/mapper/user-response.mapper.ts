import { UserEntiry } from '../../domain/entities/user.entity'
import { UserPresenter } from '../../infra/presenters/user.presenter'
import { UserResponse } from '../response/user-response'

export class UserMapper {
  static toResponse(entity: UserEntiry): UserResponse.User {
    return entity.toJSON()
  }

  static toPresente(response: UserResponse.User): UserPresenter {
    return new UserPresenter(response)
  }
}
