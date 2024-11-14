import { faker } from '@faker-js/faker/.'
import { UserProps } from '../../entities/user.entity'

type UserDataBuilderProps = {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export function UserDataBuilder(props: UserDataBuilderProps): UserProps {
  return {
    firstName: props.firstName ?? faker.person.firstName(),
    lastName: props.lastName ?? faker.person.lastName(),
    email: props.email ?? faker.internet.email(),
    password: props.password ?? faker.internet.password(),
    active: props.active ?? true,
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.createdAt ?? new Date(),
  }
}
