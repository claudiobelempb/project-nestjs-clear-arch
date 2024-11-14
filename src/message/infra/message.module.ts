import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageEntity } from '../domain/entities/message.entity'
import { MessageFindAllController } from './controllers/message-findall.controller'
import { MessageFindAllService } from '../application/services/message-findall.service'
import { MessageFindByIdService } from '../application/services/message-findbyid.service'

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  controllers: [MessageFindAllController],
  providers: [MessageFindAllService, MessageFindByIdService],
})
export class MessageModule {}
