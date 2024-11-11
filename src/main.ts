import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './modules/app/infra/app.module'
import { ClassSerializerInterceptor } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  await app.listen(process.env.PORT ?? 3333)
}
bootstrap()
