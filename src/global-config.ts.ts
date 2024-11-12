import { Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common'
import { WrapperDataInterceptor } from './shared/infra/interceptors/wrapper-data/wrapper-data.interceptor'

export function applyGloboConfig(app: INestApplication) {
  app.setGlobalPrefix('api/v1')
  app.useGlobalInterceptors(
    new WrapperDataInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  )
}
