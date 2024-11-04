import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '../../domain/repositories/user-repository'
export namespace UserDeleteUseCase {
  export type Request = {
    id: string
  }

  export type Response = void

  export class UseCase implements DefaultUseCase<Request, Response> {
    constructor(private readonly userRepository: UserRepository.Repository) {}
    async execute(request: Request): Promise<Response> {
      await this.userRepository.delete(request.id)
    }
  }
}
