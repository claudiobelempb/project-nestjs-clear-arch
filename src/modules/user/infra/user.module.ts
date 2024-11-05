import { Module } from '@nestjs/common'

import { UserService } from './user.service'
import { UserSingnupController } from './controllers/user-signup.controller'
import { UserSignupUseCase } from '../application/usecases/user-signup.usecase'
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-memory.repository'
import { BcryptjsHashProvider } from './providers/hash-provider/bcryptjs-hash.provider'
import { UserRepository } from '../domain/repositories/user-repository'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { UserSigninUseCase } from '../application/usecases/user-signin.usecase'
import { UserFindAllUseCase } from '../application/usecases/user-findall.usecase'
import { UserFindByIdUseCase } from '../application/usecases/user-findbyid.usecase'
import { UserUpdateUseCase } from '../application/usecases/user-update.usecase'
import { UserUpdatePasswordUseCase } from '../application/usecases/user-update-password.usecase'
import { UserUpdateActiveUseCase } from '../application/usecases/user-update-active.usecase'
import { UserDeleteUseCase } from '../application/usecases/user-delete.usecase'

@Module({
  imports: [],
  controllers: [UserSingnupController],
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
    {
      provide: UserSigninUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new UserSigninUseCase.UseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: UserFindByIdUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UserFindByIdUseCase.UseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
    {
      provide: UserFindAllUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UserFindAllUseCase.UseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
    {
      provide: UserUpdateUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UserUpdateUseCase.UseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
    {
      provide: UserUpdatePasswordUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new UserUpdatePasswordUseCase.UseCase(
          userRepository,
          hashProvider,
        )
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: UserUpdateActiveUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UserUpdateActiveUseCase.UseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
    {
      provide: UserDeleteUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UserDeleteUseCase.UseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}
