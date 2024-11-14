import { MessageEntity } from '@/message/domain/entities/message.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class MessageFindByIdService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async execute(id: string): Promise<MessageEntity> {
    try {
      const entity = await this.messageRepository.findOne({
        where: {
          id,
        },
      })
      return entity
    } catch (error) {
      throw new NotFoundException('Entity not found...')
    }
  }
}
