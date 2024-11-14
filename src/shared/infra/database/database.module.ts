import { DynamicModule, Global, Module } from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import { EnvConfigModule } from '../env-config/env-config.module'
import { PrismaService } from './prisma.service'
import { PrismaClient } from '@prisma/client'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOption } from './typeorm/typeorm-config'

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...dataSourceOption,
          autoLoadEntities: true, // Carrega entidades sem precisar especificar-las
        }
      },
    }),
    EnvConfigModule.forRoot(),
  ],
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
