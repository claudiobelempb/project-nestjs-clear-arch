import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import { UserEntiry } from '@/user/domain/entities/user.entity'
import { UserRepository } from '@/user/domain/repositories/user-repository'

import { ConfictError } from '@/shared/domain/errors/conflict-error'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserModelMapper } from '../../prisma/model/user-model.mapper'

export class UserTypeOrmRepository implements UserRepository.Repository {
  sortableFields: string[] = ['firstName', 'createdAt']

  constructor(
    @InjectRepository(UserEntiry)
    private readonly userRepository: Repository<UserEntiry>,
  ) {}

  async findByEmail(email: string): Promise<UserEntiry> {
    try {
      const entity = await this.userRepository.findOne({
        where: { email },
      })
      return UserModelMapper.toEntity(entity)
    } catch (error) {
      throw new NotFoundError(`UserModel not found unind email ${email}`)
    }
  }

  async emailExists(email: string): Promise<void> {
    const entity = await this.userRepository.findOne({
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

    const count = await this.userRepository.count({
      ...(props.filter && {
        where: {
          firstName: props.filter,
        },
      }),
    })

    const models = await this.userRepository.find({
      ...(props.filter && {
        where: {
          firstName: props.filter,
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
    this.userRepository.create(entity.toJSON())
  }

  async findById(id: string): Promise<UserEntiry> {
    return this._get(id)
  }

  async findAll(): Promise<UserEntiry[]> {
    const models = await this.userRepository.find()
    return models.map(model => UserModelMapper.toEntity(model))
  }

  async update(id: string, entity: UserEntiry): Promise<void> {
    await this._get(entity._id)
    await this.userRepository.update(id, entity.toJSON())
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    await this.userRepository.delete(id)
  }

  protected async _get(id: string): Promise<UserEntiry> {
    try {
      const entity = await this.userRepository.findOne({
        where: { id },
      })
      return UserModelMapper.toEntity(entity)
    } catch (error) {
      throw new NotFoundError(`UserModel not found unind ID ${id}`)
    }
  }
}
