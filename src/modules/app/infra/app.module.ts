import { Module } from '@nestjs/common'

import { AppService } from './app.service'

import { AppController } from './controllers/app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EnvConfigModule } from '@/shared/infra/env-config/env-config.module'
import { UserModule } from '@/modules/user/infra/user.module'
import { MessageModule } from '@/modules/message/infrastructure/message.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'dbrecado',
      autoLoadEntities: true,
      synchronize: true,
      migrations: [],
    }),
    UserModule,
    MessageModule,
    EnvConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
