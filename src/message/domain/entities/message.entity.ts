import { DefaultEntity } from '@/shared/domain/entities/default-entity'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'
import { MessageValidatorFactory } from '../validators/message-validator-factory'

export type MessageProps = {
  text: string
  from: string
  to: string
  isRead?: boolean
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type MessageUpdateProps = Omit<
  MessageProps,
  'isRead' | 'isActive' | 'createdAt' | 'updatedAt'
>

export class MessageEntity extends DefaultEntity<MessageProps> {
  constructor(
    public readonly props: MessageProps,
    id?: string,
  ) {
    MessageEntity.validate(props)
    super(props, id)
    this.props.isRead = this.props.isRead ?? false
    this.props.isActive = this.props.isActive ?? true
    this.props.createdAt = this.props.createdAt ?? new Date()
    this.props.updatedAt = this.props.createdAt ?? new Date()
  }

  update(value: MessageUpdateProps) {
    MessageEntity.validate({
      ...this.props,
      text: value.text,
      from: value.from,
    })
    this.props.text = value.text
    this.props.from = value.from
    this.props.to = value.to
  }

  updateIsRead(value: boolean) {
    MessageEntity.validate({
      ...this.props,
      isRead: value,
    })
    this.props.isRead = value
  }

  updateIsActive(value: boolean) {
    MessageEntity.validate({
      ...this.props,
      isActive: value,
    })
    this.props.isActive = value
  }

  get text() {
    return this.props.text
  }

  private set text(value: string) {
    this.props.text = value
  }

  get from() {
    return this.props.from
  }

  private set from(value: string) {
    this.props.from = value
  }

  get to() {
    return this.props.to
  }

  private set to(value: string) {
    this.props.to = value
  }

  get isRead() {
    return this.props.isRead
  }

  private set isRead(value: boolean) {
    this.props.isRead = value
  }

  get isActive() {
    return this.props.isActive
  }

  private set isActive(value: boolean) {
    this.props.isActive = value
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static validate(props: MessageProps) {
    const validator = MessageValidatorFactory.create()
    const isValid = validator.validate(props)

    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
