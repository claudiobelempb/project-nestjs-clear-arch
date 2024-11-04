import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserType } from '../response/user-response'
import { UserRepository } from '../../domain/repositories/user-repository'
import { UserMapper } from '../mapper/user-response.mapper'
import { InvalidPasswordError } from '@/shared/application/errors/invalid-password.error'
import { HashProvider } from '@/shared/application/providers/hash-provider'

export namespace UserUpdatePasswordUseCase {
  export type Request = {
    id: string
    password: string
    oldPassword: string
  }

  export type Response = UserType.UserResponse

  export class UseCase implements DefaultUseCase<Request, Response> {
    constructor(
      private readonly userRepository: UserRepository.Repository,
      private readonly hashProvider: HashProvider,
    ) {}
    async execute(request: Request): Promise<Response> {
      const { id, password, oldPassword } = request
      const entity = await this.userRepository.findById(id)

      if (!password || !oldPassword) {
        throw new InvalidPasswordError(
          'Old password and new password is required',
        )
      }
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        entity.password,
      )

      if (!checkOldPassword) {
        throw new InvalidPasswordError('Old password does not math')
      }

      const hashPassword = await this.hashProvider.generateHash(password)
      entity.updatePassword(hashPassword)
      await this.userRepository.update(entity)
      return UserMapper.Response.toResponse(entity)
    }
  }
}
