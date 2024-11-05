import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '../../domain/repositories/user-repository'
import { UserResponse } from '../response/user-response'
import { UserMapper } from '../mapper/user-response.mapper'
import { UserRequest } from '../../infra/request/user.request'
export namespace UserFindByIdUseCase {
  export type Request = UserRequest.userId

  export type Response = UserResponse.User
  export class UseCase implements DefaultUseCase<Request, Response> {
    constructor(private readonly userRepository: UserRepository.Repository) {}
    async execute(request: Request): Promise<Response> {
      const entity = await this.userRepository.findById(request.id)
      return UserMapper.Response.toResponse(entity)
    }
  }
}
