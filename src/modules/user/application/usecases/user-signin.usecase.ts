import { HashProvider } from '@/shared/application/providers/hash-provider'
import { UserRepository } from '../../domain/repositories/user-repository'
import { BadRequestError } from '../../../../shared/application/errors/bad-request.error'
import { UserResponse } from '../response/user-response'
import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserMapper } from '../mapper/user-response.mapper'
import { InvalidCredentialsError } from '@/shared/application/errors/invalid-credentials-error'
import { UserRequest } from '../../infra/request/user.request'

export class UserSigninUseCase
  implements DefaultUseCase<UserRequest.UserSignin, UserResponse.User>
{
  constructor(
    private readonly userRepository: UserRepository.Repository,
    private readonly hashProvider: HashProvider,
  ) {}
  async execute(request: UserRequest.UserSignin): Promise<UserResponse.User> {
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

    return UserMapper.Response.toResponse(entity)
  }
}
