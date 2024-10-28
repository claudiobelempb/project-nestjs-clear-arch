import { AppEntity } from '../entities/app-entity'
import { RepositoryInteface } from './repository-contracts'

export interface SeachacleRepositoryInteface<
  E extends AppEntity,
  SearchInput,
  SearchOutput,
> extends RepositoryInteface<E> {
  search(props: SearchInput): Promise<SearchOutput>
}
