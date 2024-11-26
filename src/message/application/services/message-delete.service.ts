import { MessageRepository } from '@/message/domain/repositories/message-repository'
import { NotFoundException } from '@nestjs/common'

export class MessageDeleteService {
  constructor(
    private readonly messageRepository: MessageRepository.Repository,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      const entity = await this.messageRepository.findById(id)
      await this.messageRepository.delete(entity.id)
    } catch (error) {
      throw new NotFoundException('Entity not found...')
    }
  }
}
