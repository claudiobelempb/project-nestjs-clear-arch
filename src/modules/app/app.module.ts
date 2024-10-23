import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from '../message/message.module';

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
      migrations: []
    }),
    UserModule, MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
