import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ConflictErrorFilter } from './shared/infra/exception-filters/conflict-error/conflict.error'
import { InvalidCredentialsErrorFilter } from './shared/infra/exception-filters/invalid-credentials-error/invalid-credentials.error'
import { InvalidPasswordErrorFilter } from './shared/infra/exception-filters/invalid-password-error/invalid-password.error'
import { NotFoundErrorFilter } from './shared/infra/exception-filters/not-found-error/not-found.error'
import { WrapperDataInterceptor } from './shared/infra/interceptors/wrapper-data/wrapper-data.interceptor'

export function applyGloboConfig(app: INestApplication) {
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ),
    app.useGlobalInterceptors(
      new WrapperDataInterceptor(),
      new ClassSerializerInterceptor(app.get(Reflector)),
    ),
    app.useGlobalFilters(
      new ConflictErrorFilter(),
      new NotFoundErrorFilter(),
      new InvalidPasswordErrorFilter(),
      new InvalidCredentialsErrorFilter(),
    )
}
