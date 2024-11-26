import { MessageEntity } from '@/message/domain/entities/message.entity'
import { MessageRequest } from '@/message/infra/request/message-request'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MessageResponse } from '../response/message-response'
import { BadRequestError } from '@/shared/application/errors/bad-request.error'
import { MessageRepository } from '@/message/domain/repositories/message-repository'
import { MessageMapper } from '../mapper/message.mapper'
import { MessagePresenter } from '@/message/infra/presenters/message.presenter'

export class MessageUpdateService {
  constructor(
    private readonly messageRepository: MessageRepository.Repository,
  ) {}

  async execute(
    id: string,
    request: MessageRequest.Message,
  ): Promise<MessagePresenter> {
    try {
      const { text, from, to } = request
      if (!text || !from || !to) {
        throw new BadRequestError('field not provided')
      }
      const entity = await this.messageRepository.findById(id)

      entity.update({ text, from, to })
      await this.messageRepository.update(id, entity)
      return MessageMapper.toPresente(entity)
    } catch (error) {
      throw new NotFoundException('Entity not found...')
    }
  }
}
