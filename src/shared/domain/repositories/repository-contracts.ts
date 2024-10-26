import { AppEntity } from '../entities/app-entity'

export interface RepositoryInteface<E extends AppEntity<E>> {
  insert(entity: E): Promise<void>
  findById(id: string): Promise<E>
  findAll(): Promise<E[]>
  update(entity: E): Promise<void>
  delete(id: string): Promise<void>
}
