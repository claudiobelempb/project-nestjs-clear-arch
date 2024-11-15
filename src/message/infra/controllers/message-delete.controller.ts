import { MessageDeleteService } from '@/message/application/services/message-delete.service'
import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common'

@Controller('messages')
export class MessageDeleteController {
  constructor(private readonly menssageDeleteService: MessageDeleteService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async handle(@Param('id') id: string): Promise<void> {
    await this.menssageDeleteService.execute(id)
  }
}
