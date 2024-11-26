import { MessageMapper } from '@/message/application/mapper/message.mapper'
import { MessageFindAllService } from '@/message/application/services/message-findall.service'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common'
import { MessageCollectionPresenter } from '../presenters/message.presenter'
import { MessageRequest } from '../request/message-request'

@Controller('messages')
export class MessageFindAllController {
  constructor(
    @Inject(MessageFindAllService)
    private readonly menssageFindAllService: MessageFindAllService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle(
    @Query() request: MessageRequest.Pagination,
  ): Promise<MessageCollectionPresenter> {
    const response = await this.menssageFindAllService.execute(request)
    return MessageMapper.toPaginationPresente(response)
  }
}
