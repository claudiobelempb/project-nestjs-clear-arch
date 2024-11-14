import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '../../domain/repositories/user-repository'
import { UserMapper } from '../mapper/user-response.mapper'
import { UserResponse } from '../response/user-response'

export class UserFindByIdUseCase
  implements DefaultUseCase<string, UserResponse.User>
{
  constructor(private readonly userRepository: UserRepository.Repository) {}
  async execute(id: string): Promise<UserResponse.User> {
    const entity = await this.userRepository.findById(id)
    return UserMapper.toResponse(entity)
  }
}
