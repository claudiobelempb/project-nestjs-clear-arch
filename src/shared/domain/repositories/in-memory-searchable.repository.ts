import { AppEntity } from '../entities/app-entity'
import { InMemoryRepository } from './in-memory.repository'
import { SeachacleRepositoryInteface } from './searchable-repository-contracts'

export abstract class InMemorySearchableRepository<E extends AppEntity>
  extends InMemoryRepository<E>
  implements SeachacleRepositoryInteface<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
