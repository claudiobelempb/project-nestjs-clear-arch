import { NotFoundError } from '@/shared/domain/errors/not-found.error'

import { MessageMapper } from '@/message/application/mapper/message.mapper'
import { MessageEntity } from '@/message/domain/entities/message.entity'
import { MessageRepository } from '@/message/domain/repositories/message-repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class MessageTypeOrmRepository implements MessageRepository.Repository {
  sortableFields: string[] = ['from', 'createdAt']

  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async search(
    props: MessageRepository.SearchParams,
  ): Promise<MessageRepository.SearchResult> {
    const sortable = this.sortableFields?.includes(props.sort)
    const orderByFilter = sortable ? props.sort : 'createdAt'
    const orderByDir = sortable ? props.sortDir : 'desc'

    const count = await this.messageRepository.count({
      ...(props.filter && {
        where: {
          from: props.filter,
        },
      }),
    })

    const models = await this.messageRepository.find({
      ...(props.filter && {
        where: {
          from: props.filter,
        },
        orderBy: {
          [orderByFilter]: orderByDir,
        },
        skip:
          props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
        take: props.perPage && props.perPage > 0 ? props.perPage : 15,
      }),
    })

    return new MessageRepository.SearchResult({
      items: models.map(model => MessageMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByFilter,
      sortDir: orderByDir,
      filter: props.filter,
    })
  }

  async insert(entity: MessageEntity): Promise<void> {
    this.messageRepository.create(entity.toJSON())
  }

  async findById(id: string): Promise<MessageEntity> {
    return this._get(id)
  }

  async findAll(): Promise<MessageEntity[]> {
    const models = await this.messageRepository.find()
    return models.map(model => MessageMapper.toEntity(model))
  }

  async update(id: string, entity: MessageEntity): Promise<void> {
    await this._get(entity._id)
    await this.messageRepository.update(id, entity.toJSON())
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    await this.messageRepository.delete(id)
  }

  protected async _get(id: string): Promise<MessageEntity> {
    try {
      const entity = await this.messageRepository.findOne({
        where: { id },
      })
      return MessageMapper.toEntity(entity)
    } catch (error) {
      throw new NotFoundError(`MessageModel not found unind ID ${id}`)
    }
  }
}
