import { UserEntiry } from '@/modules/user/domain/entities/user.entity'
import { ValidationError } from '@/shared/domain/errors/validation-error'
import { setupPrismaTests } from '@/shared/infra/database/prisma/testing/setup-prisma-test'
import { PrismaClient, User } from '@prisma/client'
import { UserModelMapper } from '../../user-model.mapper'

describe('UserModelMapper integration test', () => {
  let prismaService: PrismaClient
  let props: any

  beforeAll(async () => {
    setupPrismaTests()
    prismaService = new PrismaClient()
    await prismaService.$connect()
  })

  beforeEach(async () => {
    await prismaService.user.deleteMany()
    props = {
      id: 'f5a58223-6098-45ab-8e18-2f15ec9bc0fc',
      email: 'a@a.com',
      firstName: 'a',
      lastName: 'a',
      password: 'a',
    }
  })

  afterAll(async () => {
    await prismaService.$disconnect()
  })

  it('should throws error where user model is invalid', async () => {
    const model: User = Object.assign(props, { firstName: null })
    expect(() => UserModelMapper.toEntity(model)).toThrow(ValidationError)
  })

  it('should convert user model to a user entity', async () => {
    const model: User = await prismaService.user.create({
      data: props,
    })
    const sut = UserModelMapper.toEntity(model)
    expect(sut).toBeInstanceOf(UserEntiry)
    expect(sut.toJSON()).toStrictEqual({
      ...props,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
