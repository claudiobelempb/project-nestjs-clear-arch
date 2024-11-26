import { MessageResponse } from '@/message/application/response/message-response'
import { DefaultPresenter } from '@/shared/infra/presenters/default-presenter'
import { Transform } from 'class-transformer'

export class MessagePresenter {
  id: string
  text: string
  from: string
  to: string
  isActive: boolean
  isRead: boolean
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updatedAt: Date

  constructor(response: MessageResponse.Message) {
    this.id = response.id
    this.text = response.text
    this.from = response.from
    this.to = response.to
    this.isRead = response.isRead
    this.isActive = response.isActive
    this.createdAt = response.createdAt
    this.updatedAt = response.updatedAt
  }
}

export class MessageCollectionPresenter extends DefaultPresenter.Collection<MessagePresenter> {
  content: MessagePresenter[]

  constructor(response: MessageResponse.Pagination) {
    const { items, ...props } = response
    super(props)
    this.content = items.map(item => new MessagePresenter(item))
  }
}
