import { UserEntiry } from '../../domain/entities/user.entity'
import { UserResponse } from '../response/user-response'

export namespace UserMapper {
  export class Response {
    static toResponse(entity: UserEntiry): UserResponse.User {
      return entity.toJSON()
    }
  }
}
