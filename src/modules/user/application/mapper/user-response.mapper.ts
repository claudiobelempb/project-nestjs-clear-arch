import { UserEntiry } from '../../domain/entities/user.entity'
import { UserType } from '../response/user-response'

export namespace UserMapper {
  export class Response {
    static toResponse(entity: UserEntiry): UserType.UserResponse {
      return entity.toJSON()
    }
  }
}
