import { MessageFindAllService } from '@/message/application/services/message-findall.service'
import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common'

@Controller('messages')
export class MessageFindAllController {
  constructor(private readonly menssageFindAllService: MessageFindAllService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async handle() {
    const entity = await this.menssageFindAllService.execute()
    return entity
  }
}
