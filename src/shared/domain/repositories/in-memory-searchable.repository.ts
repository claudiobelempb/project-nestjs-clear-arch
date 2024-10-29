import { AppEntity } from '../entities/app-entity'
import { InMemoryRepository } from './in-memory.repository'
import { SeachacleRepositoryInteface } from './searchable-repository-contracts'
import { SearchParams } from './utils/search-params'
import { SearchResult } from './utils/search-result'

export abstract class InMemorySearchableRepository<E extends AppEntity>
  extends InMemoryRepository<E>
  implements SeachacleRepositoryInteface<E, any, any>
{
  async search(props: SearchParams): Promise<SearchResult<E>> {
    throw new Error('Method not implemented.')
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null,
  ): Promise<E[]>

  protected async applySort(
    items: E[],
    sort: string | null,
    sortDir: string | null,
  ): Promise<E[]> {}

  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    perPage: SearchParams['perPage'],
  ): Promise<E[]> {}
}
