import { InvalidPasswordError } from '@/shared/application/errors/invalid-password.error'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { UserRepository } from '../../domain/repositories/user-repository'
import { UserRequest } from '../../infra/request/user.request'
import { UserMapper } from '../mapper/user-response.mapper'
export class UserUpdatePasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository.Repository,
    private readonly hashProvider: HashProvider,
  ) {}
  async execute(
    id: string,
    request: UserRequest.UpdatePassword,
  ): Promise<void> {
    const { password, oldPassword } = request
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
    await this.userRepository.update(id, entity)
    UserMapper.toResponse(entity)
  }
}
