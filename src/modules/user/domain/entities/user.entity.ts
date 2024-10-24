import { AppEntity } from '@/shared/domain/entities/app-entity'

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
    super(props, id)
    this.props.active = this.props.active ?? true
    this.props.createdAt = this.props.createdAt ?? new Date()
    this.props.updatedAt = this.props.createdAt ?? new Date()
  }

  update(value: UserUpdateProps): void {
    this.props.firstName = value.firstName
    this.props.lastName = value.lastName
  }

  updatePassword(value: string) {
    this.props.password = value
  }

  updateActive(value: boolean) {
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
}
