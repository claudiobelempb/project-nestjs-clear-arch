import { Module } from '@nestjs/common'

import { HashProvider } from '@/shared/application/providers/hash-provider'
import { PrismaService } from '@/shared/infra/database/prisma.service'
import { UserDeleteUseCase } from '../application/usecases/user-delete.usecase'
import { UserFindAllUseCase } from '../application/usecases/user-findall.usecase'
import { UserFindByIdUseCase } from '../application/usecases/user-findbyid.usecase'
import { UserSigninUseCase } from '../application/usecases/user-signin.usecase'
import { UserSignupUseCase } from '../application/usecases/user-signup.usecase'
import { UserUpdateActiveUseCase } from '../application/usecases/user-update-active.usecase'
import { UserUpdatePasswordUseCase } from '../application/usecases/user-update-password.usecase'
import { UserUpdateUseCase } from '../application/usecases/user-update.usecase'
import { UserRepository } from '../domain/repositories/user-repository'
import { UserSingnupController } from './controllers/user-signup.controller'
import { UserPrismaRepository } from './database/prisma/repositories/user-prisma.repositoy'
import { BcryptjsHashProvider } from './providers/hash-provider/bcryptjs-hash.provider'
import { UserFindAllController } from './controllers/user-findall.controller'
import { UserFindByIdController } from './controllers/user-findbyid.controller'
import { UserUpdatePasswordController } from './controllers/user-update-password.controller'
import { UserUpdateActiveController } from './controllers/user-update-active.controller'
import { UserUpdateController } from './controllers/user-update.constroller'
import { UserDeleteController } from './controllers/user-delete.controller'
import { AuthModule } from '@/modules/auth/infra/auth.module'
import { UserSigninController } from './controllers/user-signin.controller'

@Module({
  imports: [AuthModule],
  controllers: [
    UserSingnupController,
    UserSigninController,
    UserFindAllController,
    UserFindByIdController,
    UserUpdateController,
    UserDeleteController,
    UserUpdatePasswordController,
    UserUpdateActiveController,
  ],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    // {
    //   provide: 'UserRepository',
    //   useClass: UserInMemoryRepository,
    // },
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'HashProvider',
      useClass: BcryptjsHashProvider,
    },
    {
      provide: UserSignupUseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new UserSignupUseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: UserSigninUseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new UserSigninUseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: UserFindByIdUseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UserFindByIdUseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
    {
      provide: UserFindAllUseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UserFindAllUseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
    {
      provide: UserUpdateUseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UserUpdateUseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
    {
      provide: UserUpdatePasswordUseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new UserUpdatePasswordUseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: UserUpdateActiveUseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UserUpdateActiveUseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
    {
      provide: UserDeleteUseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UserDeleteUseCase(userRepository)
      },
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}
