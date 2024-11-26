import { UserRepository } from '../../domain/repositories/user-repository'

export class UserUpdateActiveUseCase {
  constructor(private readonly userRepository: UserRepository.Repository) {}
  async execute(id: string, active: boolean): Promise<void> {
    const entity = await this.userRepository.findById(id)
    entity.updateActive(active)
    await this.userRepository.update(id, entity)
  }
}
