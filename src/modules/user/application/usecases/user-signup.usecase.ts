import { HashProvider } from '@/shared/application/providers/hash-provider'
import { UserEntiry } from '../../domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user-repository'
import { BadRequestError } from '../../../../shared/application/errors/bad-request.error'
import { UserResponse } from '../response/user-response'
import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserMapper } from '../mapper/user-response.mapper'
import { UserRequest } from '../../infra/request/user.request'

export namespace UserSignupUseCase {
  export type Request = UserRequest.UserSignup
  export type Response = UserResponse.User
  export class UseCase implements DefaultUseCase<Request, Response> {
    constructor(
      private readonly userRepository: UserRepository.Repository,
      private readonly hashProvider: HashProvider,
    ) {}
    async execute(request: Request): Promise<Response> {
      const { firstName, lastName, email, password } = request
      if (!firstName || !lastName || !email || !password) {
        throw new BadRequestError('Input data not provided')
      }
      await this.userRepository.emailExists(email)
      const hashPassword = await this.hashProvider.generateHash(password)

      const entity = new UserEntiry(
        Object.assign(request, {
          password: hashPassword,
        }),
      )
      await this.userRepository.insert(entity)
      return UserMapper.Response.toResponse(entity)
    }
  }
}
