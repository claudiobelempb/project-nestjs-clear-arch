import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '../../domain/repositories/user-repository'

export namespace UserUpdateActiveUseCase {
  export type Request = {
    id: string
    active: boolean
  }

  export type Response = void

  export class UseCase implements DefaultUseCase<Request, Response> {
    constructor(private readonly userRepository: UserRepository.Repository) {}
    async execute(request: Request): Promise<Response> {
      const { id, active } = request
      const entity = await this.userRepository.findById(id)
      entity.updateActive(active)
      await this.userRepository.update(entity)
    }
  }
}
