import { UserRepository } from '../../domain/repositories/user-repository'
import { UserResponse } from '../response/user-response'
export namespace FindByIdUseCase {
  export type Request = {
    id: string
  }

  export type Response = UserResponse
  export class UseCase {
    constructor(private readonly userRepository: UserRepository.Repository) {}
    async execute(request: Request): Promise<Response> {
      const entity = await this.userRepository.findById(request.id)
      return entity.toJSON()
    }
  }
}
