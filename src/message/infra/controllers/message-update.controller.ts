import { MessageUpdateService } from '@/message/application/services/message-update.service'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Put,
} from '@nestjs/common'
import { MessageRequest } from '../request/message-request'
import { MessageResponse } from '@/message/application/response/message-response'

@Controller('messages')
export class MessageUpdateController {
  constructor(
    @Inject(MessageUpdateService)
    private readonly menssageUpdateService: MessageUpdateService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async handle(
    @Param('id') id: string,
    @Body() request: MessageRequest.Message,
  ): Promise<MessageResponse.Message> {
    return await this.menssageUpdateService.execute(id, request)
  }
}
