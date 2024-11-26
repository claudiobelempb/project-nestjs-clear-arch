import { MessageEntity } from '@/message/domain/entities/message.entity'
import { MessageRepository } from '@/message/domain/repositories/message-repository'
import { MessageRequest } from '@/message/infra/request/message-request'
import { BadRequestError } from '@/shared/application/errors/bad-request.error'
import { MessageMapper } from '../mapper/message.mapper'
import { MessageResponse } from '../response/message-response'
import { Injectable, Scope } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable({ scope: Scope.DEFAULT })
export class MessageCreateService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: MessageRepository.Repository,
  ) {}

  async execute(
    request: MessageRequest.Message,
  ): Promise<MessageResponse.Message> {
    const { text, from, to } = request
    if (!text || !from || !to) {
      throw new BadRequestError('Input data not provided')
    }
    const entity = new MessageEntity(Object.assign(request))
    await this.messageRepository.insert(entity)
    return MessageMapper.toResponse(entity)
  }
}
