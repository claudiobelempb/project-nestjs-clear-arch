import { MessageFindByIdService } from '@/message/application/services/message-findbyid.service'
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'

@Controller('messages')
export class MessageFindAllController {
  constructor(
    private readonly menssageFindByIdService: MessageFindByIdService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async handle(@Param('id') id: string) {
    const entity = await this.menssageFindByIdService.execute(id)
    return entity
  }
}
