import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserType } from '../response/user-response'
import { UserRepository } from '../../domain/repositories/user-repository'
import { BadRequestError } from '@/shared/application/errors/bad-request.error'
import { NotFoundError } from '@/shared/domain/errors/entity-not-found.error'
import { UserMapper } from '../mapper/user-response.mapper'

export namespace UserUpdateUseCase {
  export type Request = {
    id: string
    firstName: string
    lastName: string
  }

  export type Response = UserType.UserResponse

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
