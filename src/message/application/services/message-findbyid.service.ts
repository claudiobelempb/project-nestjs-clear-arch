import { MessageEntity } from '@/message/domain/entities/message.entity'
import { MessageRepository } from '@/message/domain/repositories/message-repository'
import { NotFoundException } from '@nestjs/common'
export class MessageFindByIdService {
  constructor(
    private readonly messageRepository: MessageRepository.Repository,
  ) {}

  async execute(id: string): Promise<MessageEntity> {
    try {
      const entity = await this.messageRepository.findById(id)
      return entity
    } catch (error) {
      throw new NotFoundException('Entity not found...')
    }
  }
}
