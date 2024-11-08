import { UserEntiry } from '@/modules/user/domain/entities/user.entity'
import { UserRepository } from '@/modules/user/domain/repositories/user-repository'
import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import { PrismaService } from '@/shared/infra/database/prisma.service'
import { UserModelMapper } from '../user-model.mapper'

export class UserPrismaRepository implements UserRepository.Repository {
  sortableFields: string[]

  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(id: string): Promise<UserEntiry> {
    return this._get(id)
  }

  async emailExists(email: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async search(
    props: UserRepository.SearchParams,
  ): Promise<UserRepository.SearchResult> {
    throw new Error('Method not implemented.')
  }

  async insert(entity: UserEntiry): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<UserEntiry> {
    throw new Error('Method not implemented.')
  }

  async findAll(): Promise<UserEntiry[]> {
    throw new Error('Method not implemented.')
  }

  async update(entity: UserEntiry): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  protected async _get(id: string): Promise<UserEntiry> {
    try {
      const entity = await this.prismaService.user.findUnique({
        where: { id },
      })
      return UserModelMapper.toEntity(entity)
    } catch (error) {
      throw new NotFoundError(`UserModel not found unind ID ${id}`)
    }
  }
}
