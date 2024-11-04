import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '../../domain/repositories/user-repository'
import { UserType } from '../response/user-response'
import { UserMapper } from '../mapper/user-response.mapper'
export namespace UserFindByIdUseCase {
  export type Request = {
    id: string
  }

  export type Response = UserType.UserResponse
  export class UseCase implements DefaultUseCase<Request, Response> {
    constructor(private readonly userRepository: UserRepository.Repository) {}
    async execute(request: Request): Promise<Response> {
      const entity = await this.userRepository.findById(request.id)
      return UserMapper.Response.toResponse(entity)
    }
  }
}
