import { DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '../../domain/repositories/user-repository'

export class UserDeleteUseCase implements DefaultUseCase<string, void> {
  constructor(private readonly userRepository: UserRepository.Repository) {}
  async execute(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
