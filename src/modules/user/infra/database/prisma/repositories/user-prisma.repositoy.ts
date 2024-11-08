import { UserEntiry } from '@/modules/user/domain/entities/user.entity'
import { UserRepository } from '@/modules/user/domain/repositories/user-repository'
import { PrismaService } from '@/shared/infra/database/prisma.service'

export class UserPrismaRepository implements UserRepository.Repository {
  sortableFields: string[]

  constructor(private readonly prismaService: PrismaService) {}

  findByEmail(email: string): Promise<UserEntiry> {
    throw new Error('Method not implemented.')
  }

  emailExists(email: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  search(
    props: UserRepository.SearchParams,
  ): Promise<UserRepository.SearchResult> {
    throw new Error('Method not implemented.')
  }

  insert(entity: UserEntiry): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<UserEntiry> {
    throw new Error('Method not implemented.')
  }

  findAll(): Promise<UserEntiry[]> {
    throw new Error('Method not implemented.')
  }

  update(entity: UserEntiry): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
