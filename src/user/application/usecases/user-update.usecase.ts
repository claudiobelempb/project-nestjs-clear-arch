import { BadRequestError } from '@/shared/application/errors/bad-request.error'
import { UserRepository } from '../../domain/repositories/user-repository'
import { UserPresenter } from '../../infra/presenters/user.presenter'
import { UserRequest } from '../../infra/request/user.request'
import { UserMapper } from '../mapper/user-response.mapper'

export class UserUpdateUseCase {
  constructor(private readonly userRepository: UserRepository.Repository) {}
  async execute(
    id: string,
    request: UserRequest.Update,
  ): Promise<UserPresenter> {
    const { firstName, lastName } = request
    if (!firstName || !lastName) {
      throw new BadRequestError('FirstName or LastName not provided')
    }

    const entity = await this.userRepository.findById(id)
    entity.update({ firstName, lastName })
    await this.userRepository.update(id, entity)
    return UserMapper.toPresente(entity)
  }
}
