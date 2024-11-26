import { MessageEntity } from '@/message/domain/entities/message.entity'
import { ValidationError } from '@/shared/domain/errors/validation-error'
import { Message } from '@prisma/client'

export class MessageModelMapper {
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
}
