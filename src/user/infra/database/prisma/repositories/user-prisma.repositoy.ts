import { ConfictError } from '@/shared/domain/errors/conflict-error'
import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import { PrismaService } from '@/shared/infra/database/prisma.service'
import { UserEntiry } from '@/user/domain/entities/user.entity'
import { UserRepository } from '@/user/domain/repositories/user-repository'
import { UserModelMapper } from '../model/user-model.mapper'

export class UserPrismaRepository implements UserRepository.Repository {
  sortableFields: string[] = ['firstName', 'createdAt']

  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntiry> {
    try {
      const entity = await this.prismaService.user.findUnique({
        where: { email },
      })
      return UserModelMapper.toEntity(entity)
    } catch (error) {
      throw new NotFoundError(`UserModel not found unind email ${email}`)
    }
  }

  async emailExists(email: string): Promise<void> {
    const entity = await this.prismaService.user.findUnique({
      where: { email },
    })

    if (entity) {
      throw new ConfictError(`Email address alredy used`)
    }
  }

  async search(
    props: UserRepository.SearchParams,
  ): Promise<UserRepository.SearchResult> {
    const sortable = this.sortableFields?.includes(props.sort)
    const orderByFilter = sortable ? props.sort : 'createdAt'
    const orderByDir = sortable ? props.sortDir : 'desc'

    const count = await this.prismaService.user.count({
      ...(props.filter && {
        where: {
          firstName: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    })

    const models = await this.prismaService.user.findMany({
      ...(props.filter && {
        where: {
          firstName: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
        orderBy: {
          [orderByFilter]: orderByDir,
        },
        skip:
          props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
        take: props.perPage && props.perPage > 0 ? props.perPage : 15,
      }),
    })

    return new UserRepository.SearchResult({
      items: models.map(model => UserModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByFilter,
      sortDir: orderByDir,
      filter: props.filter,
    })
  }

  async insert(entity: UserEntiry): Promise<void> {
    await this.prismaService.user.create({
      data: entity.toJSON(),
    })
  }

  async findById(id: string): Promise<UserEntiry> {
    return this._get(id)
  }

  async findAll(): Promise<UserEntiry[]> {
    const models = await this.prismaService.user.findMany()
    return models.map(model => UserModelMapper.toEntity(model))
  }

  async update(id: string, entity: UserEntiry): Promise<void> {
    await this._get(id)
    await this.prismaService.user.update({
      data: entity.toJSON(),
      where: {
        id,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    await this.prismaService.user.delete({
      where: {
        id,
      },
    })
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
