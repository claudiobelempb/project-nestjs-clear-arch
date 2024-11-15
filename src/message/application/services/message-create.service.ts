import { MessageEntity } from '@/message/domain/entities/message.entity'
import { MessageRequest } from '@/message/infra/request/message-request'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class MessageCreateService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async execute(request: MessageRequest.Message): Promise<MessageEntity> {
    console.log(request)
    const entity = this.messageRepository.create(request)
    return this.messageRepository.save(entity)
  }
}
