import { DefaultEntity } from '../entities/default-entity'

export interface RepositoryInteface<E extends DefaultEntity> {
  insert(entity: E): Promise<void>
  findById(id: string): Promise<E>
  findAll(): Promise<E[]>
  update(entity: E): Promise<void>
  delete(id: string): Promise<void>
}
