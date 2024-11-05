import { Module } from '@nestjs/common'

import { UserService } from './user.service'
import { UserCreateController } from './controllers/user-create.controller'
import { UserSignupUseCase } from '../application/usecases/user-signup.usecase'
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-memory.repository'
import { BcryptjsHashProvider } from './providers/hash-provider/bcryptjs-hash.provider'
import { UserRepository } from '../domain/repositories/user-repository'
import { HashProvider } from '@/shared/application/providers/hash-provider'

@Module({
  imports: [],
  controllers: [UserCreateController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useClass: BcryptjsHashProvider,
    },
    {
      provide: UserSignupUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new UserSignupUseCase.UseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider'],
    },
  ],
})
export class UserModule {}
