import { InvalidCredentialsError } from '@/shared/application/errors/invalid-credentials-error'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { BadRequestError } from '../../../../shared/application/errors/bad-request.error'
import { UserRepository } from '../../domain/repositories/user-repository'
import { UserRequest } from '../../infra/request/user.request'
import { UserMapper } from '../mapper/user-response.mapper'
import { UserResponse } from '../response/user-response'

export class UserSigninUseCase {
  constructor(
    private readonly userRepository: UserRepository.Repository,
    private readonly hashProvider: HashProvider,
  ) {}
  async execute(request: UserRequest.Signin): Promise<UserResponse.User> {
    const { email, password } = request
    if (!email || !password) {
      throw new BadRequestError('Input data not provided')
    }
    const entity = await this.userRepository.findByEmail(email)
    const hashPasswordMatches = await this.hashProvider.compareHash(
      password,
      entity.password,
    )

    if (!hashPasswordMatches) {
      throw new InvalidCredentialsError('Inalid credentials')
    }

    return UserMapper.toResponse(entity)
  }
}
