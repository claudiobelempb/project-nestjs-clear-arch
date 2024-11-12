import { Module } from '@nestjs/common'

import { AppService } from './app.service'

import { AuthModule } from '@/modules/auth/infra/auth.module'
import { MessageModule } from '@/modules/message/infrastructure/message.module'
import { UserModule } from '@/modules/user/infra/user.module'
import { DatabaseModule } from '@/shared/infra/database/prisma/database.module'
import { EnvConfigModule } from '@/shared/infra/env-config/env-config.module'
import { AppController } from './controllers/app.controller'

@Module({
  imports: [
    UserModule,
    MessageModule,
    EnvConfigModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
