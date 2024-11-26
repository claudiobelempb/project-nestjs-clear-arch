import { MessageCreateService } from '@/message/application/services/message-create.service'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common'
import { MessageRequest } from '../request/message-request'

@Controller('messages')
export class MessageCreateController {
  constructor(
    @Inject(MessageCreateService)
    private readonly menssageCreateService: MessageCreateService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(@Body() request: MessageRequest.Message) {
    const entity = await this.menssageCreateService.execute(request)
    return entity
  }
}
