import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'projectdb',
  entities: [],
  synchronize: true, // Sincroniza com o BD. não deve ser usado em produção
  migrations: [],
}

export const dataSource = new DataSource({
  ...dataSourceOption,
})
