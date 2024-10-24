import { Entity } from '@/shared/domain/entities/app-entity'

export type UserProps = {
  name: string
  email: string
  password: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}
export class UserEntiry extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    super(props, id)
    this.props.active = this.props.active ?? true
    this.props.createdAt = this.props.createdAt ?? new Date()
    this.props.updatedAt = this.props.createdAt ?? new Date()
  }

  get name() {
    return this.props.name
  }
  get password() {
    return this.props.password
  }
  get active() {
    return this.props.active
  }
  get createdAt() {
    return this.props.createdAt
  }
  get updatedAt() {
    return this.props.updatedAt
  }
}
