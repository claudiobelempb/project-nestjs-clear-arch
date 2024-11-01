import { HashProvider } from '@/shared/application/providers/hash-provider'
import { UserEntiry } from '../../domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user-repository'
import { BadRequestError } from '../errors/bad-request.error'

export namespace FindByIdUseCase {
  export type Request = {
    id: string
  }

  export type Response = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    active: boolean
    createdAt: Date
    updatedAt: Date
  }
  export class UseCase {
    constructor(private readonly userRepository: UserRepository.Repository) {}
    async execute(request: Request): Promise<Response> {
      const entity = await this.userRepository.findById(request.id)
      return entity.toJSON()
    }
  }
}
