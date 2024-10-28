import { RepositoryInteface } from '@/shared/domain/repositories/repository-contracts'
import { UserEntiry } from '../entities/user.entity'
import { SeachacleRepositoryInteface } from '@/shared/domain/repositories/searchable-repository-contracts'

export interface UserRepositoryInterface
  extends SeachacleRepositoryInteface<UserEntiry, any, any> {
  findByEmail(email: string): Promise<UserEntiry>
  emailExists(email: string): Promise<void>
}
