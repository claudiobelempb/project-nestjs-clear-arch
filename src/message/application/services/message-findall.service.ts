import { MessageEntity } from '@/message/domain/entities/message.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class MessageFindAllService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async execute(): Promise<MessageEntity[]> {
    return await this.messageRepository.find()
  }
}
