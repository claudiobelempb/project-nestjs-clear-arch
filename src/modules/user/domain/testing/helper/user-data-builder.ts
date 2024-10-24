import { faker } from '@faker-js/faker/.'
import { UserProps } from '../../entities/user.entity'

type UserDataBuilderProps = {
  name?: string
  email?: string
  password?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export function UserDataBuilder(props: UserDataBuilderProps): UserProps {
  return {
    name: props.name ?? faker.person.firstName(),
    email: props.email ?? faker.internet.email(),
    password: props.password ?? faker.internet.password(),
    active: props.active ?? true,
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.createdAt ?? new Date(),
  }
}
