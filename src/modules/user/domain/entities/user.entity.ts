export type UserPros = {
  name: string
  email: string
  password: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}
export class UserEntiry {
  constructor(private readonly props: UserPros) {
    ;(this.props.active = this.props.active ?? true),
      (this.props.createdAt = this.props.createdAt ?? new Date())
    this.props.updatedAt = this.props.createdAt ?? new Date()
  }
}
