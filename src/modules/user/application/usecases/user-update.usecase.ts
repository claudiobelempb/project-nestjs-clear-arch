import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserResponse } from '../response/user-response'
import { UserRepository } from '../../domain/repositories/user-repository'
import { BadRequestError } from '@/shared/application/errors/bad-request.error'
import { UserMapper } from '../mapper/user-response.mapper'
import { UserRequest } from '../../infra/request/user.request'

export namespace UserUpdateUseCase {
  export type Request = UserRequest.UserSignup

  export type Response = UserResponse.User

  export class UseCase implements DefaultUseCase<Request, Response> {
    constructor(private readonly userRepository: UserRepository.Repository) {}
    async execute(request: Request): Promise<Response> {
      const { id, firstName, lastName } = request
      if (!firstName || !lastName) {
        throw new BadRequestError('FirstName or LastName not provided')
      }

      const entity = await this.userRepository.findById(id)
      entity.update({ firstName, lastName })
      await this.userRepository.update(entity)
      return UserMapper.Response.toResponse(entity)
    }
  }
}
