import { HashProvider } from '@/shared/application/providers/hash-provider'
import { UserEntiry } from '../../domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user-repository'
import { BadRequestError } from '../../../../shared/application/errors/bad-request.error'
import { UserType } from '../response/user-response'
import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserMapper } from '../mapper/user-response.mapper'

export namespace UserSignupUseCase {
  export type Request = {
    firstName: string
    lastName: string
    email: string
    password: string
  }

  export type Response = UserType.UserResponse
  export class UseCase implements DefaultUseCase<Request, Response> {
    constructor(
      private readonly userRepository: UserRepository.Repository,
      private readonly hashProvider: HashProvider,
    ) {}
    async execute(input: Request): Promise<Response> {
      const { firstName, lastName, email, password } = input
      if (!firstName || !lastName || !email || !password) {
        throw new BadRequestError('Input data not provided')
      }
      await this.userRepository.emailExists(email)
      const hashPassword = await this.hashProvider.generateHash(password)

      const entity = new UserEntiry(
        Object.assign(input, {
          password: hashPassword,
        }),
      )
      await this.userRepository.insert(entity)
      return UserMapper.Response.toResponse(entity)
    }
  }
}
