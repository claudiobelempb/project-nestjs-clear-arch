import { HashProvider } from '@/shared/application/providers/hash-provider'
import { BadRequestError } from '../../../../shared/application/errors/bad-request.error'
import { UserEntiry } from '../../domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user-repository'
import { UserRequest } from '../../infra/request/user.request'
import { UserMapper } from '../mapper/user-response.mapper'
import { UserResponse } from '../response/user-response'

export class UserSignupUseCase {
  constructor(
    private readonly userRepository: UserRepository.Repository,
    private readonly hashProvider: HashProvider,
  ) {}
  async execute(request: UserRequest.Signup): Promise<UserResponse.User> {
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
    return UserMapper.toResponse(entity)
  }
}
