import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields'
import { MessageRules } from './message-rules'
import { MessageProps } from '../entities/message.entity'

export class MessageValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}

export class UserValidator extends ClassValidatorFields<MessageRules> {
  validate(data: MessageProps): boolean {
    return super.validate(new MessageRules(data ?? ({} as MessageProps)))
  }
}
