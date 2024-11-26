import { MessageRepository } from '@/message/domain/repositories/message-repository'
import { MessageRequest } from '@/message/infra/request/message-request'
import { DefaultMapper } from '@/shared/application/mappers/default-mapper'
import { MessageMapper } from '../mapper/message.mapper'
import { MessageResponse } from '../response/message-response'

export class MessageFindAllService {
  constructor(
    private readonly messageRepository: MessageRepository.Repository,
  ) {}

  async execute(
    request: MessageRequest.Pagination,
  ): Promise<MessageResponse.Pagination> {
    const params = new MessageRepository.SearchParams(request)
    const result = await this.messageRepository.search(params)
    return this.toResponse(result)
  }

  private toResponse(
    result: MessageRepository.SearchResult,
  ): MessageResponse.Pagination {
    const items = result.items.map(item => {
      return MessageMapper.toResponse(item)
    })
    return DefaultMapper.PaginationMapper.toResponse(items, result)
  }
}
