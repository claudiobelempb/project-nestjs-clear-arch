import { AppEntity } from '../entities/app-entity'
import { RepositoryInteface } from './repository-contracts'
import { SearchParams } from './utils/search-params'
export interface SeachacleRepositoryInteface<
  E extends AppEntity,
  SearchInput,
  SearchOutput,
> extends RepositoryInteface<E> {
  search(props: SearchParams): Promise<SearchOutput>
}
