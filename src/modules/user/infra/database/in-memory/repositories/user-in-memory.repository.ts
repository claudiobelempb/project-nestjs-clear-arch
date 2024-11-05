import { UserEntiry } from '@/modules/user/domain/entities/user.entity'
import { UserRepository } from '@/modules/user/domain/repositories/user-repository'
import { ConfictError } from '@/shared/domain/errors/conflict-error'
import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository'
import { SorDirection } from '@/shared/domain/repositories/utils/search-params'

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntiry>
  implements UserRepository.Repository
{
  sortableFields: string[] = ['firstName', 'createdAt']
  async findByEmail(email: string): Promise<UserEntiry> {
    const entity = this.items.find(item => item.email === email)
    if (!entity) {
      throw new NotFoundError(`Entity not found using ${email}`)
    }
    return entity
  }
  async emailExists(email: string): Promise<void> {
    const entity = this.items.find(item => item.email === email)
    if (entity) {
      throw new ConfictError(`Email address already used ${email}`)
    }
  }

  protected async applyFilter(
    items: UserEntiry[],
    filter: UserRepository.Filter,
  ): Promise<UserEntiry[]> {
    if (!filter) {
      return items
    }
    return items.filter(item => {
      return item.props.firstName.toLowerCase().includes(filter.toLowerCase())
    })
  }

  protected async applySort(
    items: UserEntiry[],
    sort: string | null,
    sortDir: SorDirection | null,
  ): Promise<UserEntiry[]> {
    return !sort
      ? super.applySort(items, 'createdAt', 'desc')
      : super.applySort(items, sort, sortDir)
  }
}
