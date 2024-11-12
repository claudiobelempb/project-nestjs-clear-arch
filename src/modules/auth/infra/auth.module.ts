import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { EnvConfigModule } from '@/shared/infra/env-config/env-config.module'
import { JwtModule } from '@nestjs/jwt'
import { EnvConfigService } from '@/shared/infra/env-config/env-config.service'

@Module({
  imports: [
    EnvConfigModule,
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      useFactory: async (configService: EnvConfigService) => ({
        global: true,
        secret: configService.getJwtSecret(),
        signOptions: { expiresIn: configService.getJwtExpiresInSeconds() },
      }),
      inject: [EnvConfigService],
    }),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
