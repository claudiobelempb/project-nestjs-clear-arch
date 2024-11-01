import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '../../domain/repositories/user-repository'
import { SearchResponse } from '@/shared/application/response/search-reponse'
import { DefaultResponse } from '@/shared/application/response/default-response'
import { UserType } from '../response/user-response'
import { DefaultMapper } from '@/shared/application/mappers/default-mapper'

export namespace FindAllUseCase {
  export type Request = SearchResponse

  export type Response =
    DefaultResponse.PaginationResponse<UserType.UserResponse>

  export class UseCase implements DefaultUseCase<Request, Response> {
    constructor(private readonly userRepository: UserRepository.Repository) {}
    async execute(request: Request): Promise<Response> {
      const params = new UserRepository.SearchParams(request)
      const result = await this.userRepository.search(params)
      return this.toResponse(result)
    }

    private toResponse(result: UserRepository.SearchResult): Response {
      const items = result.items.map(item => {
        return DefaultMapper.UserResponseMapper.toResponse(item)
      })
      return DefaultMapper.PaginationResponseMapper.toResponse(items, result)
    }
  }
}
