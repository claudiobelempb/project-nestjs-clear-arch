import { Reflector } from '@nestjs/core'
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common'
import { WrapperDataInterceptor } from './shared/infra/interceptors/wrapper-data/wrapper-data.interceptor'
import { ConflictErrorFilter } from './shared/infra/exception-filters/conflict-error/conflict.error'

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
    app.useGlobalFilters(new ConflictErrorFilter())
}
