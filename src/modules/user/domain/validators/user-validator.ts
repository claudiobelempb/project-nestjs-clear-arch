import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'
import { UserProps } from '../entities/user.entity'
import { UserRoles } from './user-roles'

export class UserValidator extends ClassValidatorFields<UserRoles> {
  validate(data: UserProps): boolean {
    return super.validate(new UserRoles(data ?? ({} as UserProps)))
  }
}
