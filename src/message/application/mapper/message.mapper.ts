import { MessageEntity } from '@/message/domain/entities/message.entity'
import {
  MessageCollectionPresenter,
  MessagePresenter,
} from '@/message/infra/presenters/message.presenter'
import { ValidationError } from '@/shared/domain/errors/validation-error'
import { Message } from '@prisma/client'
import { MessageResponse } from '../response/message-response'

export class MessageMapper {
  static toEntity(model: Message) {
    const data = {
      text: model.text,
      from: model.from,
      to: model.to,
    }
    try {
      return new MessageEntity(data, model.id)
    } catch {
      throw new ValidationError('An entity not be loaded')
    }
  }

  static toResponse(entity: MessageEntity): MessageResponse.Message {
    return entity.toJSON()
  }

  static toPresente(response: MessageResponse.Message): MessagePresenter {
    return new MessagePresenter(response)
  }

  static toPaginationPresente(
    response: MessageResponse.Pagination,
  ): MessageCollectionPresenter {
    return new MessageCollectionPresenter(response)
  }
}
