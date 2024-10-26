import { AppEntity } from '../entities/app-entity'
import { RepositoryInteface } from './repository-contracts'

export abstract class InMemoryRepository<E extends AppEntity<E>>
  implements RepositoryInteface<E>
{
  constructor(parameters) {}

  insert(entity: E): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<E> {
    throw new Error('Method not implemented.')
  }

  findAll(): Promise<E[]> {
    throw new Error('Method not implemented.')
  }

  update(entity: E): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
