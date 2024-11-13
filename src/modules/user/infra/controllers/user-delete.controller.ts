import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common'
import { UserDeleteUseCase } from '../../application/usecases/user-delete.usecase'
import { AuthGuard } from '@/modules/auth/infra/auth.guard'
@UseGuards(AuthGuard)
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
