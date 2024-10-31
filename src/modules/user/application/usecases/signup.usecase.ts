import { UserEntiry } from '../../domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user-repository'
import { BadRequestError } from '../errors/bad-request.error'

export namespace SignupUseCase {
  export type Input = {
    firstName: string
    lastName: string
    email: string
    password: string
  }

  export type Output = {
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
    async execute(input: Input): Promise<Output> {
      const { firstName, lastName, email, password } = input
      if (!firstName || !lastName || !email || !password) {
        throw new BadRequestError('Input data not provided')
      }
      await this.userRepository.emailExists(email)

      const entity = new UserEntiry(input)
      await this.userRepository.insert(entity)
      return entity.toJSON()
    }
  }
}
