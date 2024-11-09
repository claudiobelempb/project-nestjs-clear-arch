import { UserEntiry } from '@/modules/user/domain/entities/user.entity'
import { ValidationError } from '@/shared/domain/errors/validation-error'
import { User } from '@prisma/client'

export class UserModelMapper {
  static toEntity(model: User) {
    const data = {
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      password: model.password,
    }
    try {
      return new UserEntiry(data, model.id)
    } catch {
      throw new ValidationError('An entity not be loaded')
    }
  }
}
