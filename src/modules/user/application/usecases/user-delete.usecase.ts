import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '../../domain/repositories/user-repository'
import { Injectable } from '@nestjs/common'
export namespace UserDeleteUseCase {
  export type Request = {
    id: string
  }

  export type Response = void
  @Injectable()
  export class UseCase implements DefaultUseCase<Request, Response> {
    constructor(private readonly userRepository: UserRepository.Repository) {}
    async execute(request: Request): Promise<Response> {
      await this.userRepository.delete(request.id)
    }
  }
}
