import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '../../domain/repositories/user-repository'
import { SearchResponse } from '@/shared/application/response/search-reponse'

export namespace FindAllUseCase {
  export type Request = SearchResponse

  export type Response = void

  export class UseCase implements DefaultUseCase<Request, Response> {
    constructor(private readonly userRepository: UserRepository.Repository) {}
    execute(request: Request): Response | Promise<Response> {
      const params = new UserRepository.SearchParams(request)
      const result = this.userRepository.search(params)
    }
  }
}
