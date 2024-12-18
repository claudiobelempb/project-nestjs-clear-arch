import { DefaultEntity } from '../entities/default-entity'
import { NotFoundError } from '../errors/not-found.error'
import { RepositoryInteface } from './repository-contracts'

export abstract class InMemoryRepository<E extends DefaultEntity>
  implements RepositoryInteface<E>
{
  items: E[] = []

  async insert(entity: E): Promise<void> {
    this.items.push(entity)
  }

  async findById(id: string): Promise<E> {
    return this._get(id)
  }

  async findAll(): Promise<E[]> {
    return this.items
  }

  async update(id: string, entity: E): Promise<void> {
    await this._get(id)
    const index = this.items.findIndex(item => item.id === id)
    this.items[index] = entity
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    const index = this.items.findIndex(item => item.id === id)
    this.items.splice(index, 1)
  }

  protected async _get(id: string): Promise<E> {
    const _id = `${id}`
    const entity = this.items.find(item => item.id === _id)
    if (!entity) {
      throw new NotFoundError('Entity not found')
    }
    return entity
  }
}
