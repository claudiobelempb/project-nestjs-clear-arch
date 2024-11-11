import { UserResponse } from '../response/user-response'
import { UserRepository } from '../../domain/repositories/user-repository'
import { BadRequestError } from '@/shared/application/errors/bad-request.error'
import { UserMapper } from '../mapper/user-response.mapper'
import { UserRequest } from '../../infra/request/user.request'

export class UserUpdateUseCase {
  constructor(private readonly userRepository: UserRepository.Repository) {}
  async execute(
    id: string,
    request: UserRequest.UserUpdate,
  ): Promise<UserResponse.User> {
    const { firstName, lastName } = request
    if (!firstName || !lastName) {
      throw new BadRequestError('FirstName or LastName not provided')
    }

    const entity = await this.userRepository.findById(id)
    entity.update({ firstName, lastName })
    await this.userRepository.update(entity)
    return UserMapper.toResponse(entity)
  }
}
