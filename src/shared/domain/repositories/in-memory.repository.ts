import { AppEntity } from '../entities/app-entity'
import { RepositoryInteface } from './repository-contracts'

export abstract class InMemoryRepository<E extends AppEntity<E>>
  implements RepositoryInteface<E>
{
  itens: E[] = []

  async insert(entity: E): Promise<void> {
    this.itens.push(entity)
  }

  async findById(id: string): Promise<E> {
    const _id = `${id}`
    const entity = this.itens.find(item => item.id === _id)
    if (!entity) {
      throw new Error('Entity not found')
    }
    return entity
  }

  async findAll(): Promise<E[]> {
    return this.itens
  }

  update(entity: E): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
