import { Module } from '@nestjs/common'

import { AuthModule } from '@/auth/infra/auth.module'
import { MessageModule } from '@/message/infra/message.module'
import { DatabaseModule } from '@/shared/infra/database/database.module'
import { EnvConfigModule } from '@/shared/infra/env-config/env-config.module'
import { UserModule } from '@/user/infra/user.module'

@Module({
  imports: [
    UserModule,
    MessageModule,
    EnvConfigModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
