import { AuthModule } from '@/auth/infra/auth.module'
import { PrismaService } from '@/shared/infra/database/prisma.service'
import { Module } from '@nestjs/common'
import { MessageCreateService } from '../application/services/message-create.service'
import { MessageRepository } from '../domain/repositories/message-repository'
import { MessageCreateController } from './controllers/message-create.controller'
import { MessageDeleteController } from './controllers/message-delete.controller'

import { MessageFindByIdController } from './controllers/message-findbyid.controller'
import { MessageUpdateController } from './controllers/message-update.controller'

import { MessageDeleteService } from '../application/services/message-delete.service'
import { MessageFindAllService } from '../application/services/message-findall.service'
import { MessageFindByIdService } from '../application/services/message-findbyid.service'
import { MessageUpdateService } from '../application/services/message-update.service'
import { MessageFindAllController } from './controllers/message-findall.controller'
import { MessagePrismaRepository } from './database/prisma/repositories/message-prisma.repository'

@Module({
  imports: [AuthModule],
  controllers: [
    MessageCreateController,
    MessageFindAllController,
    MessageFindByIdController,
    MessageUpdateController,
    MessageDeleteController,
  ],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'MessageRepository',
      useFactory: (prismaService: PrismaService) => {
        return new MessagePrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: MessageCreateService,
      useFactory: (messageRepository: MessageRepository.Repository) => {
        return new MessageCreateService(messageRepository)
      },
      inject: ['MessageRepository'],
    },
    {
      provide: MessageFindAllService,
      useFactory: (messageRepository: MessageRepository.Repository) => {
        return new MessageFindAllService(messageRepository)
      },
      inject: ['MessageRepository'],
    },
    {
      provide: MessageFindByIdService,
      useFactory: (messageRepository: MessageRepository.Repository) => {
        return new MessageFindByIdService(messageRepository)
      },
      inject: ['MessageRepository'],
    },
    {
      provide: MessageUpdateService,
      useFactory: (messageRepository: MessageRepository.Repository) => {
        return new MessageUpdateService(messageRepository)
      },
      inject: ['MessageRepository'],
    },
    {
      provide: MessageDeleteService,
      useFactory: (messageRepository: MessageRepository.Repository) => {
        return new MessageDeleteService(messageRepository)
      },
      inject: ['MessageRepository'],
    },
  ],
})
export class MessageModule {}
