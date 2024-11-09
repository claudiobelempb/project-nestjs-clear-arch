import { DynamicModule, Global, Module } from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import { EnvConfigModule } from '../../env-config/env-config.module'
import { PrismaService } from '../prisma.service'
import { PrismaClient } from '@prisma/client'

@Global()
@Module({
  imports: [EnvConfigModule.forRoot()],
  providers: [ConfigService, PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {
  static forTest(prismaClient: PrismaClient): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: PrismaService,
          useFactory: () => prismaClient as PrismaService,
        },
      ],
    }
  }
}
