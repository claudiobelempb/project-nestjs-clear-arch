import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOption } from '../shared/infra/database/typeorm/typeorm-config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...dataSourceOption,
        }
      },
    }),
  ],
})
export class DatabaseModule {}
