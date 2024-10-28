import { RepositoryInteface } from '@/shared/domain/repositories/repository-contracts'
import { UserEntiry } from '../entities/user.entity'

export interface UserRepositoryInterface
  extends RepositoryInteface<UserEntiry> {
  findByEmail(email: string): Promise<UserEntiry>
  emailExists(email: string): Promise<void>
}
