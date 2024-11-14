import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app/infra/app.module'
import { ClassSerializerInterceptor } from '@nestjs/common'
import { applyGloboConfig } from './global-config.ts'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  applyGloboConfig(app)
  await app.listen(process.env.PORT ?? 3333)
}
bootstrap()
