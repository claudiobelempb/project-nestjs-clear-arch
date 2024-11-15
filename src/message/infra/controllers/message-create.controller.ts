import { MessageCreateService } from '@/message/application/services/message-create.service'
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { MessageRequest } from '../request/message-request'

@Controller('messages')
export class MessageCreateController {
  constructor(private readonly menssageCreateService: MessageCreateService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(@Body() request: MessageRequest.Message) {
    console.log(request)
    const entity = await this.menssageCreateService.execute(request)
    return entity
  }
}
