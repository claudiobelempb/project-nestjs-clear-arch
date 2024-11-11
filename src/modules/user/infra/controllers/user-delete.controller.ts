import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common'
import { UserDeleteUseCase } from '../../application/usecases/user-delete.usecase'

@Controller('users')
export class UserDeleteController {
  @Inject(UserDeleteUseCase)
  private readonly userDeleteUseCase: UserDeleteUseCase

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async handle(@Param('id') id: string): Promise<void> {
    await this.userDeleteUseCase.execute(id)
  }
}
