import { AppEntity } from '@/shared/domain/entities/default-entity'
import { UserValidatorFactory } from '../validators/user-validator-factory'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

export type UserProps = {
  firstName: string
  lastName: string
  email: string
  password: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type UserUpdateProps = Omit<
  UserProps,
  'email' | 'password' | 'createdAt' | 'updatedAt' | 'active'
>
export class UserEntiry extends AppEntity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntiry.validate(props)
    super(props, id)
    this.props.active = this.props.active ?? true
    this.props.createdAt = this.props.createdAt ?? new Date()
    this.props.updatedAt = this.props.createdAt ?? new Date()
  }

  update(value: UserUpdateProps) {
    UserEntiry.validate({
      ...this.props,
      firstName: value.firstName,
      lastName: value.lastName,
    })
    this.props.firstName = value.firstName
    this.props.lastName = value.lastName
  }

  updatePassword(value: string) {
    UserEntiry.validate({
      ...this.props,
      password: value,
    })
    this.props.password = value
  }

  updateActive(value: boolean) {
    UserEntiry.validate({
      ...this.props,
      active: value,
    })
    this.props.active = value
  }

  get firstName() {
    return this.props.firstName
  }

  private set firstName(value: string) {
    this.props.firstName = value
  }

  get lastName() {
    return this.props.lastName
  }

  private set lastName(value: string) {
    this.props.lastName = value
  }

  get email() {
    return this.props.email
  }

  private set email(value: string) {
    this.props.email = value
  }

  get password() {
    return this.props.password
  }

  private set password(value: string) {
    this.props.password = value
  }

  get active() {
    return this.props.active
  }

  private set active(value: boolean) {
    this.props.active = value
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create()
    const isValid = validator.validate(props)

    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
