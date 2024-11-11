import { DefaultMapper } from '@/shared/application/mappers/default-mapper'
import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '../../domain/repositories/user-repository'
import { UserRequest } from '../../infra/request/user.request'
import { UserMapper } from '../mapper/user-response.mapper'
import { UserResponse } from '../response/user-response'

export class UserFindAllUseCase
  implements DefaultUseCase<UserRequest.Search, UserResponse.Pagination>
{
  constructor(private readonly userRepository: UserRepository.Repository) {}
  async execute(request: UserRequest.Search): Promise<UserResponse.Pagination> {
    const params = new UserRepository.SearchParams(request)
    const result = await this.userRepository.search(params)
    return this.toResponse(result)
  }

  private toResponse(
    result: UserRepository.SearchResult,
  ): UserResponse.Pagination {
    const items = result.items.map(item => {
      return UserMapper.toResponse(item)
    })
    return DefaultMapper.PaginationMapper.toResponse(items, result)
  }
}
