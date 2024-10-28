import { UserEntiry } from '@/modules/user/domain/entities/user.entity'
import { UserRepositoryInterface } from '@/modules/user/domain/repositories/user-repository-interface'
import { ConfictError } from '@/shared/domain/errors/conflict-error'
import { EntityNotFoundError } from '@/shared/domain/errors/entity-not-found.error'
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository'

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntiry>
  implements UserRepositoryInterface
{
  async findByEmail(email: string): Promise<UserEntiry> {
    const entity = this.itens.find(item => item.email === email)
    if (!entity) {
      throw new EntityNotFoundError(`Entity not found using ${email}`)
    }
    return entity
  }
  async emailExists(email: string): Promise<void> {
    const entity = this.itens.find(item => item.email === email)
    if (entity) {
      throw new ConfictError(`Email address already used ${email}`)
    }
  }
}
