export type UserPros = {
  name: string
  email: string
  password: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}
export class UserEntiry {
  constructor(public readonly props: UserPros) {
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
