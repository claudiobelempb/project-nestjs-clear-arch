import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/infrastructure/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')
  await app.listen(process.env.PORT ?? 3333)
}
bootstrap()
