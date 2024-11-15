import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageCreateService } from '../application/services/message-create.service'
import { MessageFindAllService } from '../application/services/message-findall.service'
import { MessageFindByIdService } from '../application/services/message-findbyid.service'
import { MessageEntity } from '../domain/entities/message.entity'
import { MessageFindAllController } from './controllers/message-findall.controller'
import { MessageFindByIdController } from './controllers/message-findbyid.controller'
import { MessageCreateController } from './controllers/message-create.controller'
import { MessageDeleteController } from './controllers/message-delete.controller'
import { MessageDeleteService } from '../application/services/message-delete.service'

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  controllers: [
    MessageFindAllController,
    MessageFindByIdController,
    MessageCreateController,
    MessageDeleteController,
  ],
  providers: [
    MessageFindAllService,
    MessageFindByIdService,
    MessageCreateService,
    MessageDeleteService,
  ],
})
export class MessageModule {}
